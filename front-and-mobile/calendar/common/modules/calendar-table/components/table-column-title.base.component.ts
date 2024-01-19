import { Directive, inject } from '@angular/core';
import { OUTLET_COMPONENT_PARAMS } from '@abanking/core';
import { CalendarTableBaseDirective } from '../directives';
import dayjs from 'dayjs';

export interface ITableColumnTitle {
    date: Date;
    index: number;
}

@Directive()
export class TableColumnTitleBaseComponent {
    /** Данные для отображения */
    public readonly data: ITableColumnTitle = inject(OUTLET_COMPONENT_PARAMS) as ITableColumnTitle;
    /** Данные таблицы */
    public readonly tableData: CalendarTableBaseDirective = inject(CalendarTableBaseDirective);

    /**
     * Проверка на сегодняшнюю дату
     * @returns {boolean}
     */
    public get isToday(): boolean {
        return dayjs(this.data.date).isSame(dayjs(), 'd');
    }
}
