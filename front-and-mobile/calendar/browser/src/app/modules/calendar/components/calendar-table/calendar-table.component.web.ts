import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarTableBaseComponent } from '../../../../../submodule';
import { getFadeInOutAnimation } from '@abanking/core';


@Component({
    selector: 'app-calendar-table',
    templateUrl: 'calendar-table.component.web.html',
    styleUrls: ['./styles/calendar-table.master.web.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [getFadeInOutAnimation()],
})
export class CalendarTableComponentWeb extends CalendarTableBaseComponent {
}
