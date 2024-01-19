import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableCellBaseComponent } from '../../../../../submodule';

@Component({
    selector: 'app-calendar-cell',
    templateUrl: 'calendar-cell.component.web.html',
    styleUrls: ['./styles/calendar-cell.master.web.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarCellComponentWeb extends TableCellBaseComponent {
}
