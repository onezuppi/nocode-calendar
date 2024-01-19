import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPONENTS_TOKEN, ITableComponentTokens } from './tokens';
import { CalendarManagerBaseService, CalendarManagerService, CalendarPaginationService, CreatorBaseService, EventCreatorService, EventManagerBaseService, EventManagerService, GroupManagerBaseService, GroupManagerService, } from './services';
import { CalendarTableBaseDirective, KeybrdDirecitive } from './directives';
import { CalendarInfoRequestService, EventInfoCalendarRequestService } from '../../data';
import { DateRangePipe, FilterEventsPipe } from './pipes';


const components: any[] = [
    CalendarTableBaseDirective,
    FilterEventsPipe,
    KeybrdDirecitive,
    DateRangePipe
];


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: components,
    exports: components,
})
export class CalendarTableBaseModule {
    /**
     * установка рутового модуля календаря
     * @param {IModalModuleConfig} config
     * @returns ModuleWithProviders
     */
    public static forRoot(
        config: ITableComponentTokens,
    ): ModuleWithProviders<CalendarTableBaseModule> {
        return {
            ngModule: CalendarTableBaseModule,
            providers: [
                { provide: COMPONENTS_TOKEN, useValue: config },
                {
                    provide: EventManagerBaseService,
                    useClass: EventManagerService,
                },
                {
                    provide: CalendarManagerBaseService,
                    useClass: CalendarManagerService,
                },
                {
                    provide: GroupManagerBaseService,
                    useClass: GroupManagerService,
                },
                {
                    provide: CreatorBaseService,
                    useClass: EventCreatorService,
                },
                CalendarInfoRequestService,
                EventInfoCalendarRequestService,
                CalendarPaginationService
            ],
        };
    }
}
