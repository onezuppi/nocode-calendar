import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableRowTitleBaseComponent } from '../../../../../submodule';

@Component({
    selector: 'app-row-title',
    templateUrl: 'calendar-row-title.component.web.html',
    styleUrls: ['./styles/row-title.master.web.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarRowTitleComponentWeb extends TableRowTitleBaseComponent {
}
