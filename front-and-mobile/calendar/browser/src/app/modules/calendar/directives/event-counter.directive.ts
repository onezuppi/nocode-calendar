import { Directive, Input } from '@angular/core';
import { IDayEvents, ITableLightEvent } from '../../../../submodule';
import dayjs, { Dayjs } from 'dayjs';
import { getDateWithoutTimes } from '@abanking/core';
import { EventsRangeDirective } from './evens-range.directive';

@Directive({
    selector: '[event-counter]',
    exportAs: 'eventCounter'
})
export class EventCounterDirective {
    @Input()
    public set events(es: IDayEvents[]) {
        this._es = es;
        this._count = es.map(() => []);
        es.forEach((day, i) => {
           day.events.forEach(e => this.countEventsInDay(e));
        });
    }

    public get events(): IDayEvents[] {
        const visited: Set<ITableLightEvent> = new Set<ITableLightEvent>();
        return this._es.map((e, i) => ({
            date: e.date,
            events: this.count[i].filter((e) => {
                if (visited.has(e)){
                    return false;
                }
                visited.add(e);

                return true;
            })
        }))
    }


    public get count(): ITableLightEvent[][] {
        return this._count;
    }

    private _count: ITableLightEvent[][] = [];
    private _es: IDayEvents[] = [];

    constructor(
        private readonly _range: EventsRangeDirective,
    ) {
    }

    /**
     * Подсчет количества ивентов в дне
     * @param {ITableLightEvent} e
     */
    public countEventsInDay(e: ITableLightEvent): void {
       let cur: Dayjs = dayjs(this._range.firstDate).clone();
       const [start, end]: Dayjs[] = [dayjs(e.dateStartUtc).clone(), dayjs(e.dateEndUtc).clone()]
           .map(t => getDateWithoutTimes(t));
       while (cur.isSameOrBefore(this._range.lastDate)) {
           if (cur.isSameOrBefore(end) && cur.isSameOrAfter(start)) {
               const index: number = cur.diff(this._range.firstDate, 'day');
               if (!this._count[index].includes(e)){
                   this._count[index].push(e);
               }
           }
           cur = cur.add(1, 'day');
       }
    }
}
