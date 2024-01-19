import { AbDateTransformPipeModule, TranslateModule } from '@abanking/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    CalendarBudgeStandaloneComponent,
    CalendarPaginationReadonlyService,
    CalendarTableBaseModule,
    EventManagerBaseService,
    IS_READONLY_TOKEN,
} from '../../../../../submodule';
import { SelectControlWebModule, UiSvgIconCommonModule } from '@abanking/ui';
import { CalendarMobileModule } from '../../modules/calendar/calendar.mobile.module';


@Component({
    templateUrl: './layout-calendar-readonly.page.web.html',
    styleUrls: ['./styles/layout-calendar.master.web.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        CalendarMobileModule,
        CalendarTableBaseModule,
        AbDateTransformPipeModule,
        SelectControlWebModule,
        CalendarBudgeStandaloneComponent,
        UiSvgIconCommonModule,
    ],
    providers: [
        {
            provide: IS_READONLY_TOKEN,
            useValue: true
        },
        CalendarPaginationReadonlyService
    ]
})
export class LayoutCalendarReadonlyPageWeb {
    constructor(
        public readonly eventManager: EventManagerBaseService,
        public readonly pgS: CalendarPaginationReadonlyService,
    ) {
    }
}
