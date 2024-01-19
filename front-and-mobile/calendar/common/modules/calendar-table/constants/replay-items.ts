import { ISelectItem } from '@abanking/ui';
import { ReplayInterval } from '../enums';

export const replayItems: Array<ISelectItem<number>> = [
    {
        name: 'Каждый день',
        value: ReplayInterval.day
    },
    {
        name: 'Каждую неделю',
        value: ReplayInterval.week
    },
    {
        name: 'Каждый месяц',
        value: ReplayInterval.month
    },
    {
        name: 'Каждый год',
        value: ReplayInterval.year
    },
];
