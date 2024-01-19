import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { DestroyService } from '@abanking/core';
import { CalendarPaginationService, OneDayEventContainerBaseComponent } from '../../../../../submodule';

@Component({
    selector: 'app-calendar-event-container',
    templateUrl: './calendar-month-event-container.web.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/calendar-month-event-container.master.web.component.scss'],
    providers: [
        DestroyService,
    ]
})
export class CalendarMonthEventContainerWebComponent extends OneDayEventContainerBaseComponent {
    @HostBinding('class.is-other-month')
    public get isOtherMonth(): boolean {
        return this.data.date.getMonth() !== this.pgS.now$.value.getMonth();
    }

    public readonly pgS: CalendarPaginationService = inject(CalendarPaginationService);
}
