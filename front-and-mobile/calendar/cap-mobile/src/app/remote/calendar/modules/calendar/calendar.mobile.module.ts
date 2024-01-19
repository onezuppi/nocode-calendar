import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AbUiTabsWebModule,
    CheckboxControlWebModule,
    DataListsV2WebModule,
    DatePickerControlWebModule,
    MultiSelectControlV2WebModule,
    SelectAutocompleteControlV2WebModule,
    SelectControlWebModule,
    SwitchControlWebModule,
    TextAreaControlWebModule,
    TextAutocompleteControlV2WebModule,
    TextControlWebModule,
    UiAccordeonCommonModule,
    UiButtonWebModule,
    UiHintCommonModule,
    UiScrollableCommonModule,
    UiSvgIconCommonModule,
    UiTooltipCommonModule
} from '@abanking/ui';
import {
    CalendarBudgeStandaloneComponent,
    CalendarTableBaseModule,
    CalendarUserAvatarStandaloneComponent,
    CREATE_CALENDAR_COMPONENT_TOKEN,
    CREATE_EVENT_COMPONENT_TOKEN,
    CREATE_GROUP_COMPONENT_TOKEN, CreatorBaseService,
    EVENT_INFO_COMPONENT_TOKEN,
    EventFormManagerService,
    GroupInfoCalendarRequestService,
    SHOW_INFO_OF_EVENTS,
    UserCalendarsService,
    UserCalendarsStateService,
} from '../../../../../submodule';
import {
    AbDateTransformPipeModule,
    AbLetModule,
    BaseFileManagerBrowserModule,
    OutletComponentDirectiveModule,
    RelativeLuminance,
    RepeatStructureModule,
    TranslateModule
} from '@abanking/core';
import { TableNowLineComponentMobile } from './components/calendar-now-line/table-now-line.component.mobile';
import { CalendarTableComponentMobile } from './components/calendar-table/calendar-table.component.mobile';
import { CalendarEventComponentMobile } from './components/calendar-event/calendar-event.component.mobile';
import { EventCounterDirective } from './directives/event-counter.directive';
import { CalendarColumnTitleComponentMobile } from './components/calendar-column-title/calendar-column-title.component.mobile';
import { CalendarAllDayEventContainerMobileComponent } from './components/calendar-all-day-event-container/calendar-all-day-event-container.mobile.component';
import { ColorPickerMobileComponent } from '../color-picker/components/color-picker.mobile.component';
import { CalendarMonthEventContainerMobileComponent } from './components/calendar-month-event-container/calendar-month-event-container.mobile.component';
import { SideModalCalendarsMobileComponent } from './components/side-modal-calendars/side-modal-calendars.mobile.component';
import { EventOverflowDirective } from './directives/event-overflow.directive';
import { CalendarCellComponentMobile } from './components/calendar-cell/calendar-cell.component.mobile';
import { CalendarEventContainerMobileComponent } from './components/calendar-event-container/calendar-event-container.mobile.component';
import { ShowEventListBtnComponentMobile } from './components/show-event-list-btn/show-event-list-btn.component.mobile';
import { EventWidthDirective } from './directives/event-width.directive';
import { EventInfoComponentMobile } from './components/event-info/event-info.component.mobile';
import { EventHeightDirective } from './directives/event-height.directive';
import { CreateCalendarComponentMobile } from './components/create-calendar/create-calendar.component.mobile';
import { CreateEventComponentMobile } from './components/create-event/create-event.component.mobile';
import { EventsRangeDirective } from './directives/evens-range.directive';
import { ShowEventsMobileComponent } from './components/show-events/show-events.mobile.component';
import { CalendarRowTitleComponentMobile } from './components/calendar-row-title/calendar-row-title.component.mobile';
import { SideBarModalMobileModule } from '../side-bar/side-bar-modal.mobile.module';
import { CreateGroupComponentMobile } from './components/create-group/create-group.component.mobile';
import { EventCreatorMobileService } from './services/event-creator.mobile.service';


const components: any[] = [
    CalendarTableComponentMobile,
    CalendarEventComponentMobile,
    CalendarCellComponentMobile,
    CalendarRowTitleComponentMobile,
    TableNowLineComponentMobile,
    CalendarColumnTitleComponentMobile,
    CalendarEventContainerMobileComponent,
    CreateEventComponentMobile,
    EventInfoComponentMobile,
    CalendarMonthEventContainerMobileComponent,
    CreateCalendarComponentMobile,
    CreateGroupComponentMobile,
    CalendarAllDayEventContainerMobileComponent,
    ShowEventsMobileComponent,
    EventHeightDirective,
    EventWidthDirective,
    EventOverflowDirective,
    ShowEventListBtnComponentMobile,
    SideModalCalendarsMobileComponent,
    EventCounterDirective,
    EventsRangeDirective
];


@NgModule({
    imports: [
        CommonModule,
        AbUiTabsWebModule,
        UiScrollableCommonModule,
        CalendarTableBaseModule.forRoot({
            'day': {
                cellComponent: CalendarCellComponentMobile,
                columnTitleComponent: CalendarColumnTitleComponentMobile,
                rowTitleComponent: CalendarRowTitleComponentMobile,
                eventContainerComponent: CalendarEventContainerMobileComponent,
                eventComponent: CalendarEventComponentMobile,
                allDayContainer: CalendarAllDayEventContainerMobileComponent
            },
            'week': {
                cellComponent: CalendarCellComponentMobile,
                columnTitleComponent: CalendarColumnTitleComponentMobile,
                rowTitleComponent: CalendarRowTitleComponentMobile,
                eventContainerComponent: CalendarEventContainerMobileComponent,
                eventComponent: CalendarEventComponentMobile,
                allDayContainer: CalendarAllDayEventContainerMobileComponent
            },
            'month': {
                columnTitleComponent: CalendarColumnTitleComponentMobile,
                eventContainerComponent: CalendarMonthEventContainerMobileComponent,
                eventComponent: CalendarEventComponentMobile
            },
            'year': null
        }),
        RepeatStructureModule,
        OutletComponentDirectiveModule,
        TextControlWebModule,
        DatePickerControlWebModule,
        UiButtonWebModule,
        UiAccordeonCommonModule,
        TextAreaControlWebModule,
        SwitchControlWebModule,
        SelectControlWebModule,
        MultiSelectControlV2WebModule,
        DataListsV2WebModule,
        TextAutocompleteControlV2WebModule,
        AbDateTransformPipeModule,
        TranslateModule,
        UiSvgIconCommonModule,
        AbLetModule,
        SelectAutocompleteControlV2WebModule,
        ColorPickerMobileComponent,
        UiTooltipCommonModule,
        CalendarBudgeStandaloneComponent,
        CalendarUserAvatarStandaloneComponent,
        SideBarModalMobileModule,
        CheckboxControlWebModule,
        RelativeLuminance,
        BaseFileManagerBrowserModule.forRoot(),
        UiHintCommonModule,
    ],
    declarations: components,
    exports: components,
    providers: [
        {
            provide: CREATE_EVENT_COMPONENT_TOKEN,
            useValue: CreateEventComponentMobile
        },
        {
            provide: EVENT_INFO_COMPONENT_TOKEN,
            useValue: EventInfoComponentMobile
        },
        {
            provide: CREATE_CALENDAR_COMPONENT_TOKEN,
            useValue: CreateCalendarComponentMobile,
        },
        {
            provide: CREATE_GROUP_COMPONENT_TOKEN,
            useValue: CreateGroupComponentMobile,
        },
        {
            provide: SHOW_INFO_OF_EVENTS,
            useValue: ShowEventsMobileComponent,
        },
        EventFormManagerService,
        GroupInfoCalendarRequestService,
        UserCalendarsService,
        UserCalendarsStateService,
        {
            provide: CreatorBaseService,
            useClass: EventCreatorMobileService,
        },
    ]
})
export class CalendarMobileModule {

}
