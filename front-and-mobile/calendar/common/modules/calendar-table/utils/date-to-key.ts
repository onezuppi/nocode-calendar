import dayjs from 'dayjs';

/**
 * Конвертация даты в ключ
 * @param {Date} date
 * @returns {string}
 */
export const dateToKey = (date: Date): string => dayjs(date).format('YYYY.MM.DD');
