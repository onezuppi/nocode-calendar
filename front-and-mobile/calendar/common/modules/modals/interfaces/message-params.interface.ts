import { ButtonUiType } from '@abanking/ui';

export interface IMessageParams {
    /** заголовок тоста */
    readonly title?: string;
    /** текст в тосте */
    readonly message: string;
    /** тип тоста */
    readonly type?: 'default' | 'error' | 'info' | 'success' | 'attention';
    /** тайтл кнопки отмены */
    readonly cancelBtnTitle?: string;
    /** Тип кнопки отмены */
    readonly cancelBtnType?: 'primary' | 'secondary';
    /** Тип кнопки отмены */
    readonly cancelBtnUiType?: ButtonUiType;
}
