import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { CalendarTableBaseDirective, ITableLightEvent } from '../../../../submodule';
import dayjs from 'dayjs';
import { getDateWithoutTimes } from '@abanking/core';
import { EventsRangeDirective } from './evens-range.directive';


@Directive({
    selector: '[event-width]',
    host: {
        '[style.height]': '"100%"',
    },
})
export class EventWidthDirective {
    /**
     * Подсчет старта
     * @returns {number}
     */
    @HostBinding('style.grid-column-start')
    public get start(): number {
        return getDateWithoutTimes(dayjs(this.event.dateStartUtc).clone())
            .isSameOrBefore(this._range.firstDate)
            ? 1
            : ((this.event.dateStartUtc.getDay() || 7));
    }

    /**
     * Подсчет конца
     * @returns {number}
     */
    @HostBinding('style.grid-column-end')
    public get end(): number {
        return getDateWithoutTimes(dayjs(this.event.dateEndUtc).clone())
            .isSameOrAfter(this._range.lastDate)
            ? 8
            : ((this.event.dateEndUtc.getDay() || 7) + 1);
    }

    /**
     * Подсчет конца
     * @returns {number}
     */
    @HostBinding('style.max-width.px')
    @HostListener('window:resize')
    public get maxWidthPx(): number {
        return (this.tableData.view === 'week'
            ? 1 / 7 * (this.end - this.start)
            : 1) * this.parent.clientWidth;
    }

    /** Ивент */
    @Input()
    public readonly event!: ITableLightEvent;

    @Input()
    public readonly parent!: HTMLElement;

    constructor(
        protected readonly tableData: CalendarTableBaseDirective,
        private readonly _range: EventsRangeDirective
    ) {
    }
}
