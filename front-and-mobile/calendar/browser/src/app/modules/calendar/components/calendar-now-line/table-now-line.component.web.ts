import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableNowLineBaseComponent } from '../../../../../submodule';

@Component({
    selector: 'app-now-line',
    templateUrl: 'table-now-line.component.web.html',
    styleUrls: ['./styles/table-now-line.master.web.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableNowLineComponentWeb extends TableNowLineBaseComponent {
}
