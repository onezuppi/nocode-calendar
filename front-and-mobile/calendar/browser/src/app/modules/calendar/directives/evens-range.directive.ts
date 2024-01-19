import { Directive, Input } from '@angular/core';
import { IDayEvents } from '../../../../submodule';
import dayjs from 'dayjs';


@Directive({
    selector: '[events-range]',
})
export class EventsRangeDirective {
    /** Ивент */
    @Input('events-range')
    public readonly events!:  IDayEvents[];

    /**
     * Первый день в календаре
     * @returns {Date}
     */
    public get firstDate(): Date {
        return dayjs(this.events?.[0]?.date ?? new Date()).clone().toDate();
    }

    /**
     * Последний день в календаре
     * @returns {Date}
     */
    public get lastDate(): Date {
        return dayjs(this.events?.[this.events.length - 1]?.date ?? new Date()).clone().toDate();
    }
}
