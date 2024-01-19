import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, Observable, switchMap } from 'rxjs';
import { ViewTypesEnum } from '../enums';
import { getDateRange, IDateRange } from '../utils';
import { ISelectItem, SelectControlViewModel, SelectItemModel, } from '@abanking/ui';
import { DestroyService } from '@abanking/core';
import { IDayEvents, IUserCalendarSelected } from '../interfaces';
import { EventManagerBaseService } from './event-manager.base.service';
import dayjs from 'dayjs';
import { ActivatedRoute } from '@angular/router';
import { UserCalendarsStateService } from './user-calendars-state.service';

@Injectable()
export class CalendarPaginationService {
    public readonly view$: BehaviorSubject<ViewTypesEnum> = new BehaviorSubject<ViewTypesEnum>(ViewTypesEnum.day);
    public readonly range$: BehaviorSubject<IDateRange> = new BehaviorSubject<IDateRange>(getDateRange());
    public readonly skip$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public readonly date$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
    public readonly now$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
    public listItems: Array<ISelectItem<ViewTypesEnum>> = [
        new SelectItemModel(ViewTypesEnum.day, 'День'),
        new SelectItemModel(ViewTypesEnum.week, 'Неделя'),
        new SelectItemModel(ViewTypesEnum.month, 'Месяц')
    ];

    /** события */
    public readonly events$: Observable<IDayEvents[]> = combineLatest(
        this.skip$,
        this.view$,
        this.date$,
        this._calendarsState.calendars$
    )
        .pipe(
            debounceTime(50),
            switchMap(([skip, type, date, calendars]: [number, ViewTypesEnum, Date, IUserCalendarSelected[]]) => {
                this.now$.next(dayjs(date).clone().add(skip, type).toDate());
                this.range$.next(getDateRange({ type, skip, date }));

                return this.eventManager.load({
                    ...this.range$.value,
                    userId: this.activatedRoute.snapshot.params.id,
                    calendarIds: calendars
                        .filter((calendar: IUserCalendarSelected) => calendar.isSelected)
                        .map((calendar: IUserCalendarSelected) => calendar.calendar.id)
                });
            }),
            switchMap(() => this.eventManager.events$),
        );

    public readonly selectView: SelectControlViewModel;

    constructor(
        public readonly eventManager: EventManagerBaseService,
        public readonly destroy$: DestroyService,
        public readonly activatedRoute: ActivatedRoute,
        private readonly _calendarsState: UserCalendarsStateService
    ) {
        this.selectView = new SelectControlViewModel({
            name: 'view',
            listItems: this.listItems,
            defaultValue: this.listItems[1]
        });
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
