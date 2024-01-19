import { ViewTypesEnum } from '../enums';


export interface ITableSize {
    w: number;
    h: number;
}

export type CalculateTableSizeFn = (view: ViewTypesEnum, days: number) => ITableSize;

/**
 * Расчет размера таблицы
 * @param {ViewTypesEnum} view
 * @param {number} days
 * @returns {ITableSize}
 */
export function calculateTableSize(view: ViewTypesEnum, days: number): ITableSize {
    switch (view) {
        case ViewTypesEnum.day:
            return { w: 1, h: 24 };
        case ViewTypesEnum.week:
            return { w: 7, h: 24 };
        case ViewTypesEnum.month:
            return { w: 7, h: Math.floor(days / 7) };
        case ViewTypesEnum.year:
            // У нас его нет пока
            return { w: 0, h: 0 };
        default:
            throw new Error(`Unknown view type: ${view}`);
    }
}
