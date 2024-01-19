import { Injectable } from '@angular/core';
import { catchError, EMPTY, finalize, map, Observable, OperatorFunction, tap } from 'rxjs';
import { EventManagerBaseService } from './event-manager.base.service';
import dayjs, { Dayjs } from 'dayjs';
import { getDateWithoutTimes, groupByElements } from '@abanking/core';
import { EventInfoCalendarRequestService, EventLightModel, EventModel, isAllDay } from '../../../data';
import { ModalManagerBaseService } from '../../modals';
import { IDayEvents, ILoadEventsParams, ITableEvent, ITableLightEvent } from '../interfaces';
import { tableEventToEditServerMapper, tableEventToServerMapper } from '../mappers';
import traverse from 'traverse';
import { dateToKey } from '../utils';


@Injectable()
export class EventManagerService extends EventManagerBaseService {
    constructor(
        public readonly eventService: EventInfoCalendarRequestService,
        public readonly toastService: ModalManagerBaseService,
    ) {
        super();
    }

    /**
     * Загрузить события календаря
     * @param {ILoadEventsParams} params
     * @returns {Observable<void>}
     */
    public load(params: ILoadEventsParams): Observable<void> {
        this.isLoadingBhs$.next(true);

        return this.eventService.getEvents(params)
            .pipe(
                map((events: EventLightModel[]) => {
                    const res: IDayEvents[] = [];
                    let current: Date = params.from;
                    const end: Date = params.to;
                    while (dayjs(current).isSameOrBefore(end)) {
                        const fEvents: EventLightModel[] = events.filter(e => {
                            const isADay: boolean = isAllDay(e.dateStartUtc, e.dateEndUtc);
                            const [from, to]: [Date, Date] = isADay ? [
                                getDateWithoutTimes(dayjs(e.dateStartUtc).clone().toDate()),
                                getDateWithoutTimes(dayjs(e.dateEndUtc).clone().toDate())
                            ] : [e.dateStartUtc, e.dateEndUtc];


                            return isADay
                                ? dayjs(from).isSameOrBefore(current) && dayjs(to).isSameOrAfter(current)
                                : dayjs(from).isSame(current, 'd');
                        });

                        res.push({
                            date: current,
                            events: fEvents.filter(e => fEvents.find(em => em.id === e.id) === e)
                        });
                        current = dayjs(current).add(1, 'day').toDate();
                    }
                    this.eventsBhs$.next(res);
                }),
                finalize(() => this.isLoadingBhs$.next(false)),
            );
    }

    /**
     * Добавление события
     * @param event
     * @return Observable<void>
     */
    public add(event: ITableEvent): Observable<void> {
        return this.eventService.createEvent(tableEventToServerMapper(event))
            .pipe(
                this.showToast('Событие создано', 'Ошибка при создании события'),
                tap((id: string) => {
                    const date: Date = getDateWithoutTimes(new Date(event.dateEndUtc));
                    const events: IDayEvents[] = this.eventsBhs$.value;
                    for (const t of events) {
                        if (dayjs(t.date).isSame(date, 'day')) {
                            t.events.push({ ...event, id });
                            break;
                        }
                    }

                    this.eventsBhs$.next(traverse(events).clone());
                }),
                map(() => void 0),
            );
    }

    /**
     * Удаление евента
     * @param id
     */
    public delete(id: string): Observable<void> {
        return this.eventService.deleteEvent(id)
            .pipe(
                this.showToast('Событие удалено', 'Ошибка при удалении'),
                map(() => {
                    const days: IDayEvents[] = this.eventsBhs$.value;
                    for (const day of days) {
                        const index: number | undefined = day.events.findIndex(e => e.id === id);
                        if (index !== -1) {
                            day.events.splice(index, 1);
                        }
                    }

                    this.eventsBhs$.next(traverse(days).clone());
                }),
            );
    }

    /**
     * Получить событие по id
     * @param {string} id
     * @returns {Observable<EventModel>}
     */
    public getById(id: string): Observable<EventModel> {
        return this.eventService.getEventById(id);
    }

    /**
     * Редактирование события
     * @param {ITableEvent} event
     * @returns {Observable<void>}
     */
    public edit(event: ITableEvent): Observable<void> {
        return this.eventService.editEvent(tableEventToEditServerMapper(event))
            .pipe(
                this.showToast('Событие изменено', 'Ошибка при изменении события'),
                tap((id: string) => {
                    const days: IDayEvents[] = this.eventsBhs$.value;
                    for (const day of days) {
                        const index: number | undefined = day.events.findIndex(e => e.id === event.id);
                        if (index) {
                            day.events[index] = { ...event, id };
                            break;
                        }
                    }

                    this.eventsBhs$.next(traverse(days).clone());
                }),
                map(() => void 0),
            );
    }

    /**
     * Показ сообщения
     * @param success
     * @param error
     * @private
     */
    private showToast<R>(success: string, error: string): OperatorFunction<R, R> {
        return <T>(source$: Observable<T>): Observable<T> => {
            return source$.pipe(
                tap(() => this.toastService.showToast({ message: success, type: 'success' })),
                catchError(() => {
                    this.toastService.showToast({ message: error, type: 'error' });

                    return EMPTY;
                }),
            );
        };
    }
}
