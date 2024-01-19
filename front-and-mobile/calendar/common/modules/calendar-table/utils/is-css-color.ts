
/** в токен */
export const DEFAULT_EVENT_COLOR: string = '#E7EBF4';

/**
 * Проверка на цвет
 * @param str string
 * @returns boolean
 */
export function isCssColor(str: string): boolean {
    const colorRegex: RegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    return colorRegex.test(str);
};
