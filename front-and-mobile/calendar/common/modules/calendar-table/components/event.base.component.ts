import { Directive, HostBinding, Input } from '@angular/core';
import { CalendarTableBaseDirective } from '../directives';
import { DEFAULT_EVENT_COLOR, isCssColor } from '../utils';
import { EVENT_ID_KEY } from '../constants';
import { ITableLightEvent } from '../interfaces';
import dayjs from 'dayjs';


@Directive()
export class EventComponent {
    /**
     * Идентификатор ивента
     * @returns {string}
     */
    @HostBinding(`attr.data-${ EVENT_ID_KEY }`)
    public get eventId(): string {
        return this.event?.id;
    }

    /**
     * Цвет ивента
     * @returns {string}
     */
    @HostBinding(`style.--event-color`)
    public get color(): string {
        return isCssColor(this.event?.color) ? this.event.color : DEFAULT_EVENT_COLOR;
    }

    /**
     * День идет один день
     * @returns {boolean}
     */
    public get isOneDayEvent(): boolean {
        return dayjs(this.event.dateEndUtc).isSame(this.event.dateStartUtc, 'day');
    }

    /** Ивент */
    @Input()
    public readonly event!: ITableLightEvent;
    @Input()
    public readonly showDateRange: boolean = false;

    constructor(
        public readonly tableData: CalendarTableBaseDirective,
    ) {
    }
}
