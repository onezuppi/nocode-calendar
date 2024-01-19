import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EventComponent } from '../../../../../submodule';


@Component({
    selector: 'app-calendar-event',
    templateUrl: 'calendar-event.component.web.html',
    styleUrls: ['./styles/calendar-events.master.web.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarEventComponentWeb extends EventComponent {
}
