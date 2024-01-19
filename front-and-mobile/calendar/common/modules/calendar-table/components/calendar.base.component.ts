import { Directive, Inject, Input } from '@angular/core';
import { CALCULATE_TABLE_SIZE_TOKEN, COMPONENTS_TOKEN, ITableComponentTokens } from '../tokens';
import { ICalendarTableViewsComponents, IDayEvents } from '../interfaces';
import { IOutletComponentParams, memoize } from '@abanking/core';
import { ITableRowParams } from './table-row-title.base.component';
import { CalendarTableBaseDirective } from '../directives';
import { ICellData } from './table-cell.base.component';
import { ITableColumnTitle } from './table-column-title.base.component';
import { CalculateTableSizeFn, ITableSize, WeekDays } from '../utils';
import { IAllDayContainerParams } from './all-day-container.base.component';


@Directive()
export class CalendarTableBaseComponent {
    /**
     * Компоненты для отображения
     * @returns {ICalendarTableViewsComponents}
     */
    public get components(): ICalendarTableViewsComponents {
        return this._config[this.tableData.view]!;
    }

    /**
     * Размер таблицы
     * @returns {ITableSize}
     */
    public get size(): ITableSize {
        return this.getTableSize(this.tableData.view, this.events.length);
    }

    /**
     * Ширина колонки заголовка если он есть
     * @returns {number}
     */
    public get titleColumnWidth(): number {
        return this.components.rowTitleComponent ? this.tableData.titleColumnWidth : 0;
    }

    /** Контейнеры для отображения */
    @Input()
    public readonly events!: IDayEvents[];
    /** Состояние загрузки */
    @Input()
    public readonly isLoading!: boolean;

    constructor(
        @Inject(COMPONENTS_TOKEN) private readonly _config: ITableComponentTokens,
        @Inject(CALCULATE_TABLE_SIZE_TOKEN) protected readonly getTableSize: CalculateTableSizeFn,
        protected readonly tableData: CalendarTableBaseDirective
    ) {
    }

    /**
     * Создание контекста для заголовка строки
     * @param {number} index
     * @returns {IOutletComponentParams<ITableRowParams>}
     */
    @memoize()
    public rowTitleContext(index: number): IOutletComponentParams<ITableRowParams> {
        return {
            component: this.components.rowTitleComponent!,
            params: {
                index: index
            }
        };
    }

    /**
     * Создание контекста для контейнера
     * @param {IDayEvents} data
     * @returns {IOutletComponentParams<IDayEvents>}
     */
    @memoize({
        resolver: data => data
    })
    public containerContext(data: IDayEvents): IOutletComponentParams<IDayEvents> {
        return {
            component: this.components.eventContainerComponent,
            params: data
        };
    }

    /**
     * Создание контекста для контейнера
     * @param {IDayEvents[]} data
     * @returns {IOutletComponentParams<IDayEvents>}
     */
    @memoize({
        resolver: data => data
    })
    public allDayContainerContext(data: IDayEvents[]): IOutletComponentParams<IAllDayContainerParams> {
        return {
            component: this.components.allDayContainer!,
            params: {
                events: data
            }
        };
    }

    /**
     * Создание контекста для заголовка колонки
     * @param {IDayEvents} data
     * @param {number} index
     * @returns {IOutletComponentParams<ITableColumnTitle>}
     */
    @memoize({
        resolver: data => data
    })
    public columnTitleContext(data: IDayEvents, index: number): IOutletComponentParams<ITableColumnTitle> {
        return {
            component: this.components.columnTitleComponent,
            params: {
                date: data?.date,
                index: index
            }
        };
    }


    /**
     * Создание контекста для ячейки
     * @param {Date} date
     * @param {number} index
     * @returns {IOutletComponentParams<ICellData>}
     */
    @memoize({
        resolver: (date, index) => `${ date.getTime() }-${ index }`
    })
    public cellContext(date: Date, index: number): IOutletComponentParams<ICellData> {
        return {
            component: this.components.cellComponent!,
            params: {
                date,
                index,
                type: this.getType(date, index)
            }
        };
    }

    /**
     * Получение типа ячейки
     * @param {Date} date
     * @param {number} index
     * @returns {string}
     */
    public getType(date: Date, index: number): string {
        if (index >= this.tableData.endWorkDay || index < this.tableData.startWorkDay) {
            return 'workout';
        }

        if (this.tableData.weekends.includes(date.getDay() as WeekDays)) {
            return 'weekend';
        }


        return 'default';
    }
}
