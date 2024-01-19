import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, Observable, switchMap, tap } from 'rxjs';
import { ViewTypesEnum } from '../enums';
import { getDateRange, IDateRange } from '../utils';
import {
    ISelectItem,
    SelectControlViewModel,
    SelectItemModel,
} from '@abanking/ui';
import { DestroyService } from '@abanking/core';
import { IDayEvents } from '../interfaces';
import { EventManagerBaseService } from './event-manager.base.service';
import dayjs from 'dayjs';
import { ActivatedRoute } from '@angular/router';
import { EventInfoCalendarRequestService, EventLightModel } from '../../../data';

@Injectable()
export class CalendarPaginationReadonlyService {
    public readonly view$: BehaviorSubject<ViewTypesEnum> = new BehaviorSubject<ViewTypesEnum>(ViewTypesEnum.day);
    public readonly range$: BehaviorSubject<IDateRange> = new BehaviorSubject<IDateRange>(getDateRange());
    public readonly skip$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public readonly date$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
    public readonly now$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());


    /** события */
    public readonly events$: Observable<IDayEvents[]> = combineLatest(
        this.skip$,
        this.view$,
        this.date$,
    )
        .pipe(
            debounceTime(50),
            switchMap(([skip, type, date]: [number, ViewTypesEnum, Date]) => {
                this.now$.next(dayjs(date).clone().add(skip, type).toDate());
                this.range$.next(getDateRange({ type, skip, date }));

                return this._eventInfoCalendarRequestService.getEvents({
                    from: this.range$.value.from,
                    to: this.range$.value.to,
                    userId: this.activatedRoute.snapshot.params.id
                });
            }),
            switchMap((events: EventLightModel[]) => {
                return this.eventManager.load({
                    ...this.range$.value,
                    userId: this.activatedRoute.snapshot.params.id,
                    calendarIds: events
                        .map((calendar: EventLightModel) => calendar.calendarId)
                });
            }),
            switchMap(() => this.eventManager.events$),
        );

    public readonly selectView: SelectControlViewModel;

    constructor(
        public readonly eventManager: EventManagerBaseService,
        public readonly destroy$: DestroyService,
        public readonly activatedRoute: ActivatedRoute,
        private readonly _eventInfoCalendarRequestService: EventInfoCalendarRequestService
    ) {
        const listItems: Array<ISelectItem<ViewTypesEnum>> = [
            new SelectItemModel(ViewTypesEnum.day, 'День'),
            new SelectItemModel(ViewTypesEnum.week, 'Неделя'),
            new SelectItemModel(ViewTypesEnum.month, 'Месяц')
        ];
        this.selectView = new SelectControlViewModel({
            name: 'view',
            listItems: listItems,
            defaultValue: listItems[1]
        });
        this.selectView.valueChanges$
            .pipe(
                tap((item: ISelectItem<ViewTypesEnum>) => this.view$.next(item.value))
            )
            .subscribe();
    }

    /**
     * смена даты
     * @param {1 | -1} step
     */
    public step(step: 1 | -1): void {
        this.skip$.next(this.skip$.value + step);
    }

    /**
     * Перейти к дню
     * @param {Date} day
     */
    public toDay(day: Date = new Date()): void {
        this.selectView.setValue(this.selectView.listItems[0], false, false);
        this.date$.next(day);
        this.skip$.next(0);
    }
}
