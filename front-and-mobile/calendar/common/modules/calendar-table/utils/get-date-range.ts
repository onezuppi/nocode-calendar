import { ViewTypesEnum } from '../enums';
import dayjs, { Dayjs } from 'dayjs';
import { getDateWithoutTimes } from '@abanking/core';

export interface IDateRange {
    from: Date;
    to: Date
}

export interface IDayJsRange {
    from: Dayjs;
    to: Dayjs
}

/** 0 - вс, остальное по порядку */
export type WeekDays = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface IDateRangeParams {
    date: Date;
    type: ViewTypesEnum;
    skip: number;
    /** 0 - вс, остальное по порядку */
    startOfWeek: WeekDays;
    locale: string;
}

export const dateRangeDefault: IDateRangeParams = {
    date: new Date(),
    skip: 0,
    startOfWeek: 1,
    type: ViewTypesEnum.day,
    locale: 'ru'
};

const types: Record<ViewTypesEnum, number> = {
    [ViewTypesEnum.day]: 0,
    [ViewTypesEnum.week]: 1,
    [ViewTypesEnum.month]: 2,
    [ViewTypesEnum.year]: 3,
};

const reversedTypes: Record<number, ViewTypesEnum> = Object.fromEntries(
    [...Object.entries(types)].map(([a, b]: [string, number]) => [b, a])
) as Record<number, ViewTypesEnum>;


const getRange = (date: Dayjs, type: ViewTypesEnum): IDayJsRange => {
    let from: Dayjs = getDateWithoutTimes(date.clone());
    let to: Dayjs = getDateWithoutTimes(date.clone());

    while (type in types) {
        from = from.startOf(type);
        to = to.endOf(type);
        type = reversedTypes[types[type] - 1];
    }

    return { from, to };
};


export const getDateRange = (params: Partial<IDateRangeParams> = {}): IDateRange => {
    const newParams: IDateRangeParams = { ...dateRangeDefault, ...params };
    const date: Dayjs = dayjs(newParams.date).locale(newParams.locale, { weekStart: newParams.startOfWeek })
        .add(newParams.skip, newParams.type);

    const range: IDayJsRange = getRange(date, newParams.type);

    return {
        from: range.from.toDate(),
        to: range.to.toDate()
    };
};
