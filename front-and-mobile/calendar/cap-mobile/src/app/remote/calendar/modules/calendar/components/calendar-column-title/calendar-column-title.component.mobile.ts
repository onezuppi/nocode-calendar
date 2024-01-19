import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarPaginationService, TableColumnTitleBaseComponent } from '../../../../../../../submodule';
import { shortDayName } from '@abanking/core';

@Component({
    selector: 'app-column-title',
    templateUrl: 'calendar-column-title.component.mobile.html',
    styleUrls: ['./styles/calendar-column-title.master.mobile.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarColumnTitleComponentMobile extends TableColumnTitleBaseComponent {
    public get day(): string {
        return this.tableData.view === 'day' ? this.fullDayName[this.data.index]: this.shortDayName[this.data.index];
    }

    public readonly shortDayName: string[] = shortDayName;
    public readonly fullDayName: string[] = this.shortDayName.map(d => d.replace('DAY_SHORT', 'DAY_FULL'));

    constructor(public readonly pgS: CalendarPaginationService,) {
        super();
    }
}
