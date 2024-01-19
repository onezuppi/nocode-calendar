import { AbDateTransformPipeModule, DestroyService, TranslateModule } from '@abanking/core';
import { ProfileRequestService } from '@abanking/feature-nocode-common';
import {
    DataListsV2WebModule,
    ISelectItem,
    ModalService,
    MultiSelectControlV2WebModule,
    SelectControlWebModule,
    TextControlWebModule,
    UiButtonWebModule,
    UiSvgIconCommonModule
} from '@abanking/ui';
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
    UserCalendarsStateService, UsersInfoCalendarRequestService, ViewTypesEnum,
} from '../../../../../submodule';
import { CalendarWebModule } from '../../../../modules/calendar/calendar.web.module';
import dayjs from 'dayjs';
import { SideBarModalWebService } from '../../../../modules/side-bar/side-bar-modal.web.service';
import { switchMap, takeUntil } from 'rxjs';


@Component({
    templateUrl: './layout-calendar.page.web.html',
    styleUrls: ['./styles/layout-calendar.master.web.scss'],
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
        CalendarWebModule,
        CalendarTableBaseModule,
        AbDateTransformPipeModule,
        UiButtonWebModule,
        SelectControlWebModule,
        MultiSelectControlV2WebModule,
        DataListsV2WebModule,
        CalendarBudgeStandaloneComponent,
        TextControlWebModule,
    ]
})
export class LayoutCalendarPageWeb {
    public openDropdown: boolean = false;
    public openDropdownSearch: boolean = false;

    constructor(
        public readonly eventManager: EventManagerBaseService,
        public readonly destroy$: DestroyService,
        public readonly eventCreatorBaseService: CreatorBaseService,
        public readonly pgS: CalendarPaginationService,
        public readonly modalService: ModalService,
        public readonly userCalendarsService: UserCalendarsService,
        private _sideBarService: SideBarModalWebService,
        private readonly _userCalendarsService: UsersInfoCalendarRequestService,
        private readonly _userCalendarStateService: UserCalendarsStateService,
    ) {
        this.listenChangeDaysSelect();
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
