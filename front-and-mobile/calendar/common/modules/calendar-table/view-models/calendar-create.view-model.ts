import { AbankingValidators, FormBaseViewModel, IControl, ISelectItem, SelectControlV2ViewModel, SelectControlViewModel, TextControlViewModel } from '@abanking/ui';
import { CALENDAR_COLORS } from '../constants';
import { ICalendarInfo } from '../interfaces';
import { takeUntil, tap } from 'rxjs';
import { CalendarModel } from '../../../data';

export class CalendarCreateViewModel extends FormBaseViewModel<ICalendarInfo> {

    public calendarId: string | undefined;

    constructor(private _calendars: CalendarModel[]) {
        super(() => ({} as ICalendarInfo));
        this.initialize();
        this.listenCalendarChanges();
    }

    /** @inheritDoc */
    public updateModel(model: ICalendarInfo): void {
        model.name = this.getFormValue('name');
        model.id = this.calendarId!;

        const color: string = this.getFormValue('color');
        model.color = CALENDAR_COLORS.find((item: ISelectItem) => color === item.name)?.value ?? CALENDAR_COLORS[0].value;
    }

    /** @inheritDoc */
    public override fromModel(model: ICalendarInfo): void {
        if (!model) {
            return;
        }

        this.calendarId = model.id;
        this.setFormValue('color', CALENDAR_COLORS.find((item: ISelectItem) => model.color === item.value)?.name ?? model.color);
        this.setFormValue('name', model.name);
    }

    /** @inheritDoc */
    protected getControls(): IControl[] {
        return [
            new TextControlViewModel({
                name: 'name',
                options: {
                    label: 'Название календаря'
                },
                validators: [AbankingValidators.required()]
            }),
            new SelectControlV2ViewModel({
                name: 'color',
                options: {
                    label: 'Цвет'
                },
                defaultValue: CALENDAR_COLORS[0].name,
                validators: [AbankingValidators.required()],
            }),
            new SelectControlViewModel({
                name: 'calendars',
                options: {
                    label: 'Календари',
                },
                listItems: this._calendars
                    .map((calendar: CalendarModel) => ({ name: calendar.name, value: calendar }))
            })
        ];
    }

    /**
     * Прослушка изменений контрола выбора календаря
     * @private
     */
    private listenCalendarChanges(): void {
        this.controlsMap['calendars'].valueChanges$
            .pipe(
                tap((calendarItem: ISelectItem<CalendarModel>) => {
                    this.fromModel(calendarItem.value);
                }),
                takeUntil(this.onDestroy$)
            )
            .subscribe();
    }
}
