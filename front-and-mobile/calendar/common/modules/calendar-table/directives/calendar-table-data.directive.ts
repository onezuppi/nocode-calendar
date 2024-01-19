import { ViewTypesEnum } from '../enums';
import { Directive, Input } from '@angular/core';
import { WeekDays } from '../utils';

@Directive({
    selector: 'app-calendar-table',
})
export class CalendarTableBaseDirective {
    /** Высота 1 ячейки таблицы */
    @Input()
    public readonly cellHeight: number = 50;
    /** Тип отображения таблицы */
    @Input()
    public readonly view: ViewTypesEnum = ViewTypesEnum.week;
    /** Дата, с которой начинается таблица */
    @Input()
    public readonly date: Date = new Date();
    /** Нужно ли показывать линию текущего времени */
    @Input()
    public readonly showNowLine: boolean = false;
    /** Ширина колонки заголовка */
    @Input()
    public readonly titleColumnWidth: number = 0;
    /** время начала рабочего дня  */
    @Input()
    public readonly startWorkDay: number = 0;
    /** время конца рабочего дня */
    @Input()
    public readonly endWorkDay: number = 24;
    @Input()
    public readonly weekends: WeekDays[]  = [0, 6];
    /** Количество строк в таблице allDay */
    @Input()
    public readonly rowsInAllDay: number = 5;
}
