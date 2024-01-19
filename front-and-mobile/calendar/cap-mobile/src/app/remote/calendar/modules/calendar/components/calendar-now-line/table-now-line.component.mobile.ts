import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableNowLineBaseComponent } from '../../../../../../../submodule';

@Component({
    selector: 'app-now-line',
    templateUrl: 'table-now-line.component.mobile.html',
    styleUrls: ['./styles/table-now-line.master.mobile.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableNowLineComponentMobile extends TableNowLineBaseComponent {
}
