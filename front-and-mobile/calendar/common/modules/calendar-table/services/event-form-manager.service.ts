import { Injectable } from '@angular/core';
import { combineLatest, forkJoin, map, Observable, startWith, takeUntil, tap } from 'rxjs';
import { EventViewModel } from '../view-models';
import {
    CalendarInfoRequestService,
    CalendarModel,
    GroupInfoCalendarRequestService, IUserGroupResponseModel,
    UserModel,
    UsersInfoCalendarRequestService
} from '../../../data';
import { EventManagerBaseService } from './event-manager.base.service';
import { TextControlViewModel } from '@abanking/ui';

@Injectable()
export class EventFormManagerService {
    private readonly _allDayTime: string = '00:00';

    constructor(
        private _eventManagerService: EventManagerBaseService,
        private _usersInfoStateService: UsersInfoCalendarRequestService,
        private _calendarInfoDtoService: CalendarInfoRequestService,
        private _groupInfoCalendarRequestService: GroupInfoCalendarRequestService
    ) {
    }

    /**
     * Инициализация модели представления
     * @param {Observable<void>} destroy$
     * @param {Date} from
     * @param {Date} to
     * @returns {Observable<EventViewModel>}
     */
    public initViewModel(destroy$: Observable<void>, from?: Date, to?: Date): Observable<EventViewModel> {
        return forkJoin([
            this._usersInfoStateService.getUsersWithCache(),
            this._usersInfoStateService.getCurrentUserWithCache(),
            this._calendarInfoDtoService.getAllCalendars(),
            this._groupInfoCalendarRequestService.getGroups(),
        ])
            .pipe(
                map(([users, currentUser, calendars, groups]: [UserModel[], UserModel, CalendarModel[], IUserGroupResponseModel[]]) =>
                    new EventViewModel(users, calendars, currentUser, groups, from, to)),
                tap(model => this.initSubscriptions(model, destroy$)),
            );
    }

    /**
     * Инициализация подписок
     * @param {EventViewModel} model
     * @param {Observable<void>} destroy$
     * @protected
     */
    protected initSubscriptions(model: EventViewModel, destroy$: Observable<void>): void {
        let previousStartTime: string = '';
        let previousEndTime: string = '';
        const timeStartControl: TextControlViewModel = model.getControl('timeStart');
        const timeEndControl: TextControlViewModel = model.getControl('timeEnd');


        model.getControl('isAllDay').valueChanges$
            .pipe(
                tap((isAllDay: boolean) => {
                    if (isAllDay) {
                        previousStartTime = timeStartControl.getValue();
                        previousEndTime = timeEndControl.getValue();
                        timeStartControl.setValue(this._allDayTime, false, false);
                        timeEndControl.setValue(this._allDayTime, false, false);
                    } else {
                        timeStartControl.setValue(previousStartTime, false, false);
                        timeEndControl.setValue(previousEndTime, false, false);
                    }
                }),
                takeUntil(destroy$),
            )
            .subscribe();

        combineLatest([
            model.getControl('timeStart').valueChanges$.pipe(startWith(null)),
            model.getControl('timeEnd').valueChanges$.pipe(startWith(null)),
        ])
            .pipe(
                tap(([timeStart, timeEnd]: [string, string]) => {
                    if (timeStart === this._allDayTime && timeEnd === this._allDayTime) {
                        model.getControl('isAllDay').setValue(true, false, false);
                    } else {
                        model.getControl('isAllDay').setValue(false, false, false);
                    }
                }),
                takeUntil(destroy$),
            )
            .subscribe();

    }
}
