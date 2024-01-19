import { filter, map, Observable } from 'rxjs';
import { FormBaseViewModel, TextControlViewModel } from '@abanking/ui';

export class SearchFormViewModel extends FormBaseViewModel<string> {

    /**
     * Изменение значений контрола
     */
    public get onChangeSearch(): Observable<string> {
        return this.valueChanges('search');
    }

    /**
     * Эмитит событие при потере фокуса
     */
    public get unfocus$(): Observable<void> {
        return this.getControl('search').focused$
            .pipe(
                filter((value: boolean) => !value),
                map(() => void 0)
            );
    }

    private _placeholder: string;
    private _autofocus: boolean;
    private _withCleaner: boolean;

    constructor(placeholder: string = '', autofocus: boolean = true, withCleaner: boolean = false) {
        super(() => '');
        this._placeholder = placeholder;
        this._autofocus = autofocus;
        this._withCleaner = withCleaner;

        this.initialize();
    }

    /**
     * Получение значения поискового контрола
     * @returns string
     */
    public getValue(): string {
        return this.getFormValue('search');
    }

    /**
     * Очистка значения поискового контрола
     */
    public clearValue(): void {
        this.setFormValue('search', '');
    }

    /**
     * Метод наполения результирующей модели
     * @param model string
     */
    public updateModel(model: string): void {
        model = this.getFormValue('search');
    }

    /**
     * Заполняем вью-модель данными из модели
     * @param model string
     */
    public override fromModel(model: string): void {
        if (model === undefined) {
            return;
        }
        this.setFormValue('search', model);
    }

    /**
     * Контролы формы
     * @returns TextControlViewModel[]
     */
    public getControls(): TextControlViewModel[] {
        return [
            new TextControlViewModel({
                name: 'search',
                options: {
                    placeholder: this._placeholder,
                    autofocus: this._autofocus,
                    maxLengthInput: 30,
                    withCleaner: this._withCleaner,
                },

            })
        ];
    }
}
