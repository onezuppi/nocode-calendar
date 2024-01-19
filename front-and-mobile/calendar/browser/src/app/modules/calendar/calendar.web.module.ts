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
import { CalendarTableComponentWeb } from './components/calendar-table/calendar-table.component.web';
import { CalendarEventComponentWeb } from './components/calendar-event/calendar-event.component.web';
import {
    CalendarBudgeStandaloneComponent,
    CalendarTableBaseModule,
    CalendarUserAvatarStandaloneComponent,
    CREATE_CALENDAR_COMPONENT_TOKEN,
    CREATE_EVENT_COMPONENT_TOKEN,
    CREATE_GROUP_COMPONENT_TOKEN,
    EVENT_INFO_COMPONENT_TOKEN,
    EventFormManagerService,
    GroupInfoCalendarRequestService,
    LoadingDirective,
    SHOW_INFO_OF_EVENTS,
    UserCalendarsService,
    UserCalendarsStateService,
} from '../../../submodule';
import { CalendarCellComponentWeb } from './components/calendar-cell/calendar-cell.component.web';
import { CalendarRowTitleComponentWeb } from './components/calendar-row-title/calendar-row-title.component.web';
import { AbDateTransformPipeModule, AbLetModule, BaseFileManagerBrowserModule, OutletComponentDirectiveModule, RelativeLuminance, RepeatStructureModule, TranslateModule } from '@abanking/core';
import { TableNowLineComponentWeb } from './components/calendar-now-line/table-now-line.component.web';
import { CalendarColumnTitleComponentWeb, } from './components/calendar-column-title/calendar-column-title.component.web';
import { CalendarEventContainerWebComponent, } from './components/calendar-event-container/calendar-event-container.web.component';
import { CreateEventComponentWeb } from './components/create-event/create-event.component.web';
import { EventInfoComponentWeb } from './components/event-info/event-info.component.web';
import { CalendarMonthEventContainerWebComponent, } from './components/calendar-month-event-container/calendar-month-event-container.web.component';
import { CreateCalendarComponentWeb } from './components/create-calendar/create-calendar.component.web';
import { CreateGroupComponentWeb } from './components/create-group/create-group.component.web';
import { CalendarAllDayEventContainerWebComponent, } from './components/calendar-all-day-event-container/calendar-all-day-event-container.web.component';
import { EventHeightDirective } from './directives/event-height.directive';
import { EventWidthDirective } from './directives/event-width.directive';
import { ShowEventsWebComponent } from './components/show-events/show-events.web.component';
import { ColorPickerWebComponent } from '../color-picker/components/color-picker.web.component';
import { ShowEventListBtnComponentWeb } from './components/show-event-list-btn/show-event-list-btn.component.web';
import { EventOverflowDirective } from './directives/event-overflow.directive';
import { SideModalCalendarsWebComponent } from './components/side-modal-calendars/side-modal-calendars-web.component';
import { SideBarModalWebModule } from '../side-bar/side-bar-modal.web.module';
import { EventCounterDirective } from './directives/event-counter.directive';
import { EventsRangeDirective } from './directives/evens-range.directive';


const components: any[] = [
    CalendarTableComponentWeb,
    CalendarEventComponentWeb,
    CalendarCellComponentWeb,
    CalendarRowTitleComponentWeb,
    TableNowLineComponentWeb,
    CalendarColumnTitleComponentWeb,
    CalendarEventContainerWebComponent,
    CreateEventComponentWeb,
    EventInfoComponentWeb,
    CalendarMonthEventContainerWebComponent,
    CreateCalendarComponentWeb,
    CreateGroupComponentWeb,
    CalendarAllDayEventContainerWebComponent,
    ShowEventsWebComponent,
    EventHeightDirective,
    EventWidthDirective,
    EventOverflowDirective,
    ShowEventListBtnComponentWeb,
    SideModalCalendarsWebComponent,
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
                cellComponent: CalendarCellComponentWeb,
                columnTitleComponent: CalendarColumnTitleComponentWeb,
                rowTitleComponent: CalendarRowTitleComponentWeb,
                eventContainerComponent: CalendarEventContainerWebComponent,
                eventComponent: CalendarEventComponentWeb,
                allDayContainer: CalendarAllDayEventContainerWebComponent
            },
            'week': {
                cellComponent: CalendarCellComponentWeb,
                columnTitleComponent: CalendarColumnTitleComponentWeb,
                rowTitleComponent: CalendarRowTitleComponentWeb,
                eventContainerComponent: CalendarEventContainerWebComponent,
                eventComponent: CalendarEventComponentWeb,
                allDayContainer: CalendarAllDayEventContainerWebComponent
            },
            'month': {
                columnTitleComponent: CalendarColumnTitleComponentWeb,
                eventContainerComponent: CalendarMonthEventContainerWebComponent,
                eventComponent: CalendarEventComponentWeb
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
        ColorPickerWebComponent,
        UiTooltipCommonModule,
        CalendarBudgeStandaloneComponent,
        CalendarUserAvatarStandaloneComponent,
        SideBarModalWebModule,
        CheckboxControlWebModule,
        RelativeLuminance,
        BaseFileManagerBrowserModule.forRoot(),
        UiHintCommonModule,
        LoadingDirective
    ],
    declarations: components,
    exports: components,
    providers: [
        {
            provide: CREATE_EVENT_COMPONENT_TOKEN,
            useValue: CreateEventComponentWeb
        },
        {
            provide: EVENT_INFO_COMPONENT_TOKEN,
            useValue: EventInfoComponentWeb
        },
        {
            provide: CREATE_CALENDAR_COMPONENT_TOKEN,
            useValue: CreateCalendarComponentWeb,
        },
        {
            provide: CREATE_GROUP_COMPONENT_TOKEN,
            useValue: CreateGroupComponentWeb,
        },
        {
            provide: SHOW_INFO_OF_EVENTS,
            useValue: ShowEventsWebComponent,
        },
        EventFormManagerService,
        GroupInfoCalendarRequestService,
        UserCalendarsService,
        UserCalendarsStateService
    ]
})
export class CalendarWebModule {

}
