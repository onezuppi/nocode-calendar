export interface IToastParams {
    /** заголовок тоста */
    readonly title?: string;
    /** текст в тосте */
    readonly message: string;
    /** тип тоста */
    readonly type?: 'default' | 'error' | 'info' | 'success' | 'attention';
    /** закрытие тоста по таймеру */
    readonly withDurration?: boolean;
    /** тайтл кнопки сабмит */
    readonly okBtnTitle?: string;
    /** тайтл кнопки отмены */
    readonly cancelBtnTitle?: string;
    /** позиционирование */
    readonly position?: 'default' | 'fixed'
}
