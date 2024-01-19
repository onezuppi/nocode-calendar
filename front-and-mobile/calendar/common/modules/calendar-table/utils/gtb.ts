export type TbFn<T> = (index: number, item: T) => T[keyof T];

/**
 * Создает простую функцию для trackBy
 * @param {keyof T} key
 * @returns {TbFn<T>}
 */
export function gtb<T>(key: keyof T): TbFn<T> {
    return (index: number, item: T): T[typeof key]=> {
        return item[key];
    };
}


