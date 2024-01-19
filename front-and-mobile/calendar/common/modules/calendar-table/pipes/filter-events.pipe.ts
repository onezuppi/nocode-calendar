import { Pipe, PipeTransform } from '@angular/core';
import { EventLightModel } from '../../../data';
import { IDayEvents } from '../interfaces';

@Pipe({
    name: 'eFilter'
})
export class FilterEventsPipe implements PipeTransform {
    /**
     * Фильтрует события по типу
     * @param {IDayEvents[]} events
     * @param {boolean} isAllDay
     * @returns {IDayEvents[]}
     */
    public transform(events: IDayEvents[], isAllDay: boolean = false): IDayEvents[] {
        return events.map((day: IDayEvents) => {
            return {
                date: day.date,
                events: day.events.filter((event: EventLightModel) => isAllDay ? event.isAllDay : !event.isAllDay)
            };
        });
    }
}
