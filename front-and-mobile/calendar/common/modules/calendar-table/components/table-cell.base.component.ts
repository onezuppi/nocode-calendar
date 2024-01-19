import { Directive, inject } from '@angular/core';
import { OUTLET_COMPONENT_PARAMS } from '@abanking/core';
import { CalendarTableBaseDirective } from '../directives';

export interface ICellData {
    type: 'default' | 'weekend' | 'workout' | string;
    /** Индекс ячейки в столбике */
    index: number;
    date: Date;
}

@Directive()
export class TableCellBaseComponent {
    /** Данные для отображения */
    public readonly data: ICellData = inject(OUTLET_COMPONENT_PARAMS) as ICellData;
    /** Данные таблицы */
    public readonly tableData: CalendarTableBaseDirective = inject(CalendarTableBaseDirective);
}
