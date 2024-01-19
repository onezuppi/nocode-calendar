import { CheckboxArrayViewModel, CheckboxControlViewModel, ISelectItem, ModalEvent } from '@abanking/ui';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import {
    CalendarInfoRequestService,
    CalendarModel,
    CalendarPaginationService,
    ModalManagerBaseService,
    UserCalendarsStateService,
    UserModel,
    UsersInfoCalendarRequestService,
} from '../../../../../submodule';
import { forkJoin, map, Observable, switchMap, take, tap } from 'rxjs';
import { SideBarModalWebService } from '../../../side-bar/side-bar-modal.web.service';
import { IUserCalendarListResponse } from '../../../../../../../common/data/request-models';
import { UserCalendarsService } from '../../../../../../../common';
import { DestroyService, FileOpenMode, FileService } from '@abanking/core';
import { getSoftHeightAnimation } from '@abanking/core';

@Component({
    selector: 'app-side-modal-calendars',
    templateUrl: 'side-modal-calendars-web.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['styles/side-modal-calendars-web.master.component.scss'],
    providers: [
        DestroyService,
    ],
    animations: [
        getSoftHeightAnimation(),
    ],
})
export class SideModalCalendarsWebComponent {
    public isShowAddContainer: boolean = false;

    constructor(
        public readonly pgS: CalendarPaginationService,
        public readonly userCalendarsService: UserCalendarsService,
        private _calendarInfoRequestService: CalendarInfoRequestService,
        private _sideBarService: SideBarModalWebService,
        private _cdr: ChangeDetectorRef,
        private _destroy$: DestroyService,
        private _modalManagerService: ModalManagerBaseService,
        private readonly _calendarStateService: UserCalendarsStateService,
        private readonly _userInfoService: UsersInfoCalendarRequestService,
        private readonly _fileService: FileService,
    ) {
    }

    /**
     * Сохранить календари пользователя
     */
    public saveCalendars(): Observable<CalendarModel[]> {
        let myCalendars: string[] = this.userCalendarsService.calendarsCheckboxArray.checkboxList.map((checkbox: CheckboxControlViewModel) => checkbox.name);
        const multiSelectCalendars: string[] = this.userCalendarsService.multiSelectUser.getValue()?.map((item: ISelectItem) => item.value);
        const bindCalendars: string[] = [];
        const unbindCalendars: string[] = [];

        multiSelectCalendars.forEach((item: string) => {
            if (!myCalendars.includes(item)) {
                bindCalendars.push(item);
            }
        });

        myCalendars.forEach((item: string) => {
            if (!multiSelectCalendars.includes(item)) {
                unbindCalendars.push(item);
            }
        });

        return forkJoin([
            this._calendarInfoRequestService.bindCalendar(bindCalendars),
            this._calendarInfoRequestService.unbindCalendar(unbindCalendars),
        ])
            .pipe(
                switchMap(([usersAfterBind, usersAfterUnbind]: [IUserCalendarListResponse, IUserCalendarListResponse]) => {
                    myCalendars.push(...usersAfterBind.currenUserCalendarList);
                    myCalendars = myCalendars.filter((calendar: string) => usersAfterUnbind.currenUserCalendarList.includes(calendar));

                    return this._calendarInfoRequestService.getAllCalendars('mine');
                }),
                tap((users: CalendarModel[]) => {
                    if (!users.length) {
                        this.userCalendarsService.calendarsCheckboxArray.controlList = [];

                        return;
                    }

                    this.userCalendarsService.calendarsCheckboxArray = new CheckboxArrayViewModel({
                        name: 'cb-calendars',
                        options: {
                            label: 'Календари',
                        },
                        controls: users
                            .map((item: CalendarModel) => {
                                return new CheckboxControlViewModel({
                                    name: item.id,
                                    defaultValue: true,
                                    options: {
                                        label: item.name,
                                    },
                                });
                            }),
                    });

                    this._modalManagerService.showToast({
                        type: 'success',
                        message: 'Личные календари сохранены',
                    });

                    this._cdr.detectChanges();
                }),
            );
    }

    /**
     * Открытие выбора календарей
     */
    public showAddCalendar(): void {
        this.isShowAddContainer = !this.isShowAddContainer;
    }

    /**
     * Закрыть side модалку календарей
     */
    public closeModal(): void {
        this._sideBarService.closeAll();
    }

    /**
     * Сохранить настройки текущих календарей пользователя
     */
    public saveCurrentCalendars(): Observable<void> {
        const calendarsId: string[] = this.getCalendarIdList();

        return this._calendarStateService.updateIds(calendarsId)
            .pipe(
                switchMap(() => {
                    this._modalManagerService.showToast({
                        type: 'success',
                        message: 'Включенные календари сохранены',
                    });

                    return forkJoin([
                        this._userInfoService.getCurrentUser(),
                        this._calendarInfoRequestService.getAllCalendars('mine'),
                    ]);
                }),
                map(([user, calendars]: [UserModel, CalendarModel[]]) => {
                    this._calendarStateService.calendars$.next(calendars.map(calendar => {
                        return {
                            calendar: calendar,
                            isSelected: user.settings.selectedCalendarIdList.includes(calendar.id),
                        };
                    }));
                }),
                take(1),
            );
    }

    /**
     * Скачивание календарей
     */
    public downloadCalendars(): Observable<ModalEvent> {
        const calendarsId: string[] = this.getCalendarIdList();

        return this._calendarInfoRequestService.downloadCalendar(calendarsId, this.pgS.range$.value)
            .pipe(
                switchMap((file) => this._fileService.openFile(file, FileOpenMode.downloadOnly)),
                switchMap(() => this._modalManagerService.showToast({
                    type: 'success',
                    message: 'Выбранные календари скачены',
                })),
                take(1),
            );
    }

    /**
     * Получает массив айди календарей из чекбоксов
     * @returns {string[]}
     * @private
     */
    private getCalendarIdList(): string[] {
        return this.userCalendarsService.calendarsCheckboxArray.checkboxList
            .filter((checkbox: CheckboxControlViewModel) => checkbox.getValue())
            .map((checkbox: CheckboxControlViewModel) => checkbox.name);
    }
}
