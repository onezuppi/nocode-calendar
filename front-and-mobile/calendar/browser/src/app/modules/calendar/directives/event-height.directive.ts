import { Directive, HostBinding, Input } from '@angular/core';
import { CalendarTableBaseDirective, ITableLightEvent } from '../../../../submodule';
import dayjs from 'dayjs';


@Directive({
    selector: '[event-height]',
    host: {
        '[style.position]': '"absolute"'
    }
})
export class EventHeightDirective {
    /**
     * Подсчет отступа
     * @returns {number}
     */
    @HostBinding('style.top.px')
    public get top(): number {
        const hours: number = this.event.dateStartUtc.getHours();
        const minutes: number = this.event.dateStartUtc.getMinutes() / 60;

        return (hours + minutes) * this.tableData.cellHeight;
    }

    /**
     * Подсчет высоты
     * @return string
     */
    @HostBinding('style.height.px')
    public get height(): number {
        const diff: number = dayjs(this.event.dateEndUtc).diff(this.event.dateStartUtc, 'm');
        const percent: number = Math.floor(diff / 60) + ((diff % 60) / 60);

        return percent * this.tableData.cellHeight;
    }

    /** Ивент */
    @Input()
    public readonly event!: ITableLightEvent;

    constructor(
        protected readonly tableData: CalendarTableBaseDirective
    ) {
    }
}
