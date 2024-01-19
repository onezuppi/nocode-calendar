import { Directive, HostBinding, Input } from '@angular/core';
import { CalendarTableBaseDirective, ITableLightEvent } from '../../../../../../submodule';
import dayjs from 'dayjs';
import { getDateWithoutTimes } from '@abanking/core';
import { EventsRangeDirective } from './evens-range.directive';


@Directive({
    selector: '[event-overflow]',
})
export class EventOverflowDirective {
    /**
     * Признак того, что ивент начинается раньше, чем первый день в календаре
     * @returns {boolean}
     */
    @HostBinding('class.from')
    public get from(): boolean {
        return getDateWithoutTimes(dayjs(this.event.dateStartUtc).clone()).isBefore(this._range.firstDate);
    }

    /**
     * Признак того, что ивент заканчивается позже, чем последний день в календаре
     * @returns {boolean}
     */
    @HostBinding('class.to')
    public get to(): boolean {
        return getDateWithoutTimes(dayjs(this.event.dateEndUtc).clone()).isAfter(this._range.lastDate);
    }

    /** Ивент */
    @Input()
    public readonly event!: ITableLightEvent;


    constructor(
        protected readonly tableData: CalendarTableBaseDirective,
        private readonly _range: EventsRangeDirective,
    ) {
    }

}
