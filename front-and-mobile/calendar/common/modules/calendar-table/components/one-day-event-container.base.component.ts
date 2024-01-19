import { Directive } from '@angular/core';
import { EventContainerBaseComponent } from './event-container.base.component';
import dayjs from 'dayjs';
import { IDayEvents, ITableLightEvent } from '../interfaces';

@Directive()
export class OneDayEventContainerBaseComponent extends EventContainerBaseComponent<IDayEvents> {
    public get isToday(): boolean {
        return dayjs(this.data.date).isSame(dayjs(), 'day');
    }

    protected override getEventById(id?: string | null): ITableLightEvent | null {
        return this.data.events.find(e => e.id === id) || null;
    }
}
