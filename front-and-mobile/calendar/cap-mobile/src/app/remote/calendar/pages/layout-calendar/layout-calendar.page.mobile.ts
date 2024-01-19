import { AbDateTransformPipeModule, DestroyService, TranslateModule, AbLetModule } from '@abanking/core';
import { ProfileRequestService } from '@abanking/feature-nocode-common';
import { ISelectItem, ModalService, MultiSelectControlV2WebModule, UiSvgIconCommonModule } from '@abanking/ui';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    CalendarBudgeStandaloneComponent,
    CalendarInfoRequestService,
    CalendarPaginationService,
    CalendarTableBaseModule,
    CreatorBaseService,
    EventLightModel,
    EventManagerBaseService,
    getNumberByType,
    IUserCalendarSelected,
    UserCalendarsService,
    UserCalendarsStateService,
    UsersInfoCalendarRequestService,
    ViewTypesEnum,
} from '../../../../../submodule';
import dayjs from 'dayjs';
import { switchMap, takeUntil, BehaviorSubject } from 'rxjs';
import { CalendarMobileModule } from '../../modules/calendar/calendar.mobile.module';
import { DataListsV2MobileModule, SelectControlMobileModule, UiButtonMobileModule, TextControlMobileModule } from '@abanking/ui-mobile';
import { SideBarModalMobileService } from '../../modules/side-bar/side-bar-modal.mobile.service';
import { IonicModule } from '@ionic/angular';
import { ModalsMobileModule } from '../../modules/modals/modals.mobile.module';


@Component({
    templateUrl: './layout-calendar.page.mobile.html',
    styleUrls: ['./styles/layout-calendar.master.mobile.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService,
        ProfileRequestService,
        CalendarInfoRequestService,
        CalendarPaginationService,
        UserCalendarsService,
    ],
    standalone: true,
    imports: [
        CommonModule,
        UiSvgIconCommonModule,
        RouterModule,
        TranslateModule,
        CalendarMobileModule,
        CalendarTableBaseModule,
        AbDateTransformPipeModule,
        UiButtonMobileModule,
        SelectControlMobileModule,
        MultiSelectControlV2WebModule,
        DataListsV2MobileModule,
        CalendarBudgeStandaloneComponent,
        TextControlMobileModule,
        IonicModule,
        AbLetModule,
        ModalsMobileModule
    ]
})
export class LayoutCalendarPageMobile {
    public openDropdown: boolean = false;
    public openDropdownSearch: boolean = false;
    /** Флаг для режима поиска */
    public isSearch$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        public readonly eventManager: EventManagerBaseService,
        public readonly destroy$: DestroyService,
        public readonly eventCreatorBaseService: CreatorBaseService,
        public readonly pgS: CalendarPaginationService,
        public readonly modalService: ModalService,
        public readonly userCalendarsService: UserCalendarsService,
        private _sideBarService: SideBarModalMobileService,
        private readonly _userCalendarsService: UsersInfoCalendarRequestService,
        private readonly _userCalendarStateService: UserCalendarsStateService,
    ) {
        this.listenChangeDaysSelect();
    }

    /**
     * Вкл/откл. режима поиска
     * @param on
     */
    public setSearchMode(on: boolean): void {
        if (!on) {
            this.userCalendarsService.searchViewModel.setValue('', true, true);
        }
        this.isSearch$.next(on);
    }

    public changeSelectValue(currentValue: ISelectItem): void {
        const index: number = this.pgS.selectView.listItems.indexOf(currentValue);
        this.pgS.selectView.setValue(this.pgS.selectView.listItems[(index + 1) % this.pgS.selectView.listItems.length]);
    }

    /**
     * Открыть информацию о евенте
     * @param event
     */
    public openEvent(event: EventLightModel): void {
        this.eventCreatorBaseService.showEvent(event);
    }


    /**
     * Создать событие
     */
    public createEvent(): void {
        this.eventCreatorBaseService.createEvent(
            undefined,
            dayjs().toDate(),
            dayjs().add(1, 'hour').toDate(),
        ).subscribe();
    }

    /**
     * Создать Календарь
     */
    public createCalendar(isEdit?: boolean): void {
        this.eventCreatorBaseService.createCalendar(isEdit).subscribe();
    }

    /**
     * Создать группу
     */
    public createGroup(isEdit?: boolean): void {
        this.eventCreatorBaseService.createGroup(isEdit).subscribe();
    }


    /**
     * Открыть side модалку календарей
     */
    public openSideBarEditCalendar(template: TemplateRef<any>): void {
        this._sideBarService.showTemplate(template).subscribe();
    }

    /**
     * Прослушка контрола изменения типа отображения
     */
    public listenChangeDaysSelect(): void {
        this.pgS.selectView.valueChanges$
            .pipe(
                switchMap((item: ISelectItem<ViewTypesEnum>) => {
                    this.pgS.view$.next(item.value);

                    return this._userCalendarsService.setUserSettings({
                        settings: {
                            selectedTabEnum: getNumberByType(item.value),
                            selectedCalendarIdList: this._userCalendarStateService.calendars$.getValue()
                                .filter((calendar: IUserCalendarSelected) => calendar.isSelected)
                                .map((calendar: IUserCalendarSelected) => calendar.calendar.id)
                        }
                    });
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }
}
