import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableRowTitleBaseComponent } from '../../../../../../../submodule';

@Component({
    selector: 'app-row-title',
    templateUrl: 'calendar-row-title.component.mobile.html',
    styleUrls: ['./styles/row-title.master.mobile.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarRowTitleComponentMobile extends TableRowTitleBaseComponent {
}
