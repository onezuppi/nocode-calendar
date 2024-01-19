import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableCellBaseComponent } from '../../../../../../../submodule';

@Component({
    selector: 'app-calendar-cell',
    templateUrl: 'calendar-cell.component.mobile.html',
    styleUrls: ['./styles/calendar-cell.master.mobile.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarCellComponentMobile extends TableCellBaseComponent {
}
