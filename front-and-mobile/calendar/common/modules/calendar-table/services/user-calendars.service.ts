import { Injectable } from '@angular/core';
import {
    CheckboxArrayViewModel,
    CheckboxControlViewModel,
    ISelectItem,
    MultiSelectControlV2ViewModel,
    TextControlViewModel
} from '@abanking/ui';
import {
    CalendarInfoRequestService,
    CalendarModel,
    EventInfoCalendarRequestService,
    EventLightModel, UserModel, UsersInfoCalendarRequestService, UserType
} from '../../../data';
import { BehaviorSubject, switchMap, take, takeUntil, tap, debounceTime, startWith, Observable, forkJoin } from 'rxjs';
import { DestroyService } from '@abanking/core';
import { CalendarPaginationService } from './calendar-pagination.service';
import { IDateRange } from '../utils';
import { ViewTypesEnum } from '../enums';

@Injectable()
export class UserCalendarsService {
    public isLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public events$: Observable<Array<ISelectItem<EventLightModel>>>;
    public calendars$: Observable<ISelectItem[]>;
    private _calendars$: BehaviorSubject<ISelectItem[]> = new BehaviorSubject<ISelectItem[]>([]);
    private _events$: BehaviorSubject<Array<ISelectItem<EventLightModel>>> = new BehaviorSubject<Array<ISelectItem<EventLightModel>>>([]);

    public searchViewModel: TextControlViewModel = new TextControlViewModel({
        name: 'search',
        options: {
            placeholder: 'Поиск',
        },
    });

    public multiSelectUser: MultiSelectControlV2ViewModel<ISelectItem> = new MultiSelectControlV2ViewModel<ISelectItem>({
        name: 'users',
        options: {
            label: 'Календари'
        },
        stringify: (value: ISelectItem): string => value.name,
    });

    public calendarsCheckboxArray: CheckboxArrayViewModel = new CheckboxArrayViewModel({
        name: 'cb-calendars',
        options: {
            label: 'Календари',
        },
        controls: [],
    });

    constructor(
        public readonly destroy$: DestroyService,
        public readonly calendarInfoService: CalendarInfoRequestService,
        private readonly _eventInfoCalendarRequestService: EventInfoCalendarRequestService,
        private _usersInfoCalendarRequestService: UsersInfoCalendarRequestService,
        private readonly _pgS: CalendarPaginationService
    ) {
        this.events$ = this._events$.asObservable();

        this.calendars$ = this._calendars$.asObservable();

        this._usersInfoCalendarRequestService.getUsers()
            .pipe(
                tap((calendars: UserModel[]) => {
                    this._calendars$.next(
                        calendars
                            .filter((calendar: UserModel) => calendar.type === UserType.user)
                            .map((calendar: UserModel) => ({ name: calendar.fullName ?? calendar.login, value: calendar.mainCalendarId }))
                    );
                }),
                take(1)
            )
            .subscribe();

        this.loadCalendars();
    }

    /**
     * Загрузка календарей
     */
    public loadCalendars(): void {
        forkJoin([
            this._usersInfoCalendarRequestService.getCurrentUser(),
            this.calendarInfoService.getAllCalendars()
        ])
            .pipe(
                tap(([user, calendars]: [UserModel, CalendarModel[]]) => {
                    const item: ISelectItem<any> | undefined = this._pgS.selectView.listItems.find(i => getNumberByType(i.value) === user.settings.selectedTabEnum);
                    if (item) {
                        this._pgS.selectView.setValue(item, false, false);
                        this._pgS.view$.next(item.value);
                    } else {
                        this._pgS.selectView.setValue(this._pgS.selectView.listItems[1], false, false);
                        this._pgS.view$.next(this._pgS.selectView.listItems[1].value);
                    }

                    this.calendarsCheckboxArray = new CheckboxArrayViewModel({
                        name: 'cb-calendars',
                        options: {
                            label: 'Календари',
                        },
                        controls: calendars
                            .map((calendar: CalendarModel) => {
                                return new CheckboxControlViewModel({
                                    name: calendar.id,
                                    defaultValue: user.settings.selectedCalendarIdList.includes(calendar.id) ?? false,
                                    options: {
                                        label: calendar.name,
                                    }
                                });
                            }),
                    });
                    this.listenChangesOfSearch();

                    const calendarsIds: string[] = calendars.map((calendar: CalendarModel) => calendar.id);

                    this.multiSelectUser.setValue(this._calendars$.getValue()?.filter((calendar: ISelectItem) => calendarsIds.includes(calendar.value)));
                    this.isLoaded$.next(true);
                }),
                takeUntil(this.destroy$),
                take(1)
            )
            .subscribe();
    }

    /**
     * Прослушка поиска
     * @private
     */
    private listenChangesOfSearch(): void {
        this.searchViewModel.valueChanges$
            .pipe(
                startWith(''),
                debounceTime(500),
                switchMap((value: string) => {
                    const idsCalendar: string[] = this.calendarsCheckboxArray.checkboxList?.map((item: CheckboxControlViewModel) => item.name);
                    const range: IDateRange = this._pgS.range$.getValue();

                    return this._eventInfoCalendarRequestService.getEvents({
                        from: range.from,
                        to: range.to,
                        calendarIds: idsCalendar,
                        searchValue: value ?? '',
                    });
                }),
                tap((events: EventLightModel[]) => this._events$.next(
                    events.map((event: EventLightModel) => ({ name: event.name, value: event })))
                ),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }


}

/**
 * Преобразовать айтем из селекта отображение в число
 * @param type
 * @return number
 */
export function getNumberByType(type: ViewTypesEnum): number {
    const types: any = {
        [ViewTypesEnum.day]: 0,
        [ViewTypesEnum.week]: 1,
        [ViewTypesEnum.month]: 2,
        [ViewTypesEnum.year]: 3,
    };

    return types[type];
}
