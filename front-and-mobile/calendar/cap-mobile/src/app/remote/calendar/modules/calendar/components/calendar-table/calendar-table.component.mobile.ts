import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarTableBaseComponent } from '../../../../../../../submodule';
import { getFadeInOutAnimation } from '@abanking/core';


@Component({
    selector: 'app-calendar-table',
    templateUrl: 'calendar-table.component.mobile.html',
    styleUrls: ['./styles/calendar-table.master.mobile.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [getFadeInOutAnimation()],
})
export class CalendarTableComponentMobile extends CalendarTableBaseComponent {
}
