import {
    AllDayContainerBaseComponent,
    TableCellBaseComponent,
    TableColumnTitleBaseComponent,
    TableRowTitleBaseComponent,
} from '../components';
import { Type } from '@angular/core';

export interface ICalendarTableViewsComponents {
    columnTitleComponent: Type<TableColumnTitleBaseComponent>;
    eventContainerComponent: Type<any>;
    eventComponent?: Type<any>;
    cellComponent?: Type<TableCellBaseComponent>;
    rowTitleComponent?: Type<TableRowTitleBaseComponent>;
    allDayContainer?: Type<AllDayContainerBaseComponent>;
}
