import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EventComponent } from '../../../../../../../submodule';


@Component({
    selector: 'app-calendar-event',
    templateUrl: 'calendar-event.component.mobile.html',
    styleUrls: ['./styles/calendar-events.master.mobile.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarEventComponentMobile extends EventComponent {
}
