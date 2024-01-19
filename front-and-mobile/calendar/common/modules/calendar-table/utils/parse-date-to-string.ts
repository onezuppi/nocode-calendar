import dayjs, { Dayjs } from 'dayjs';
import { getDateWithoutTimes } from '@abanking/core';

/**
 * Парсинг времени из модели
 * @param date
 * @param time
 * @param resetTimeZone
 * @return string
 */
export function parseDateToModel(date: Date, time: string, resetTimeZone: boolean = false): Date {
    const [h, m]: [number, number] = time.split(':').map((n: string) => parseInt(n)) as [number, number];
    const withoutTime: Dayjs = getDateWithoutTimes(dayjs(date).clone()).set('h', h).set('m', m);

    return (resetTimeZone ? withoutTime.add(dayjs(date).utcOffset(), 'm') : withoutTime).toDate();
}

/**
 * Парсинг времени в модель
 * @param date
 * @return { date: Date, time: string }
 */
export function parseDateFromModel(date: Date): { date: Date, time: string } {
    const copy: Date = new Date(date);

    return {
        date: copy,
        time: copy?.toLocaleString()?.split(' ')?.[1]
    };
}
