import { Injectable } from '@angular/core';
import { CalendarInfoRequestService, CalendarModel, UserModel, UsersInfoCalendarRequestService } from '../../../data';
import { BehaviorSubject, forkJoin, map, Observable, switchMap, takeUntil, tap } from 'rxjs';
import { DestroyService } from '@abanking/core';
import { IUserCalendarSelected } from '../interfaces';

@Injectable()
export class UserCalendarsStateService {
    public readonly calendars$: BehaviorSubject<IUserCalendarSelected[]> = new BehaviorSubject<IUserCalendarSelected[]>([]);

    constructor(
        private readonly _destroy$: DestroyService,
        private readonly _userCalendarsService: UsersInfoCalendarRequestService,
        private readonly _calendarRequestService: CalendarInfoRequestService,
    ) {
        forkJoin([
            this._userCalendarsService.getCurrentUserWithCache(),
            this._calendarRequestService.getAllCalendars('mine')
        ])
            .pipe(
                map(([user, calendars]: [UserModel, CalendarModel[]]) => {
                    return calendars.map(c => {
                        return {
                            calendar: c,
                            isSelected: user.settings.selectedCalendarIdList.includes(c.id)
                        };
                    });
                }),
                tap((models: IUserCalendarSelected[]) => this.calendars$.next(models)),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    /**
     * Обновить список выбранных календарей
     * @param {string[]} ids
     * @returns {Observable<boolean>}
     */
    public updateIds(ids: string[]): Observable<boolean> {
        return this._userCalendarsService.getCurrentUser()
            .pipe(
                switchMap(user => this._userCalendarsService.setUserSettings({
                    settings: {
                        selectedTabEnum: user.settings.selectedTabEnum,
                        selectedCalendarIdList: ids
                    }
                })),
            );
    }

}
