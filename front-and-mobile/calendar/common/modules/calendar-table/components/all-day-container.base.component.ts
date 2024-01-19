import { Directive } from '@angular/core';
import { EventContainerBaseComponent } from './event-container.base.component';
import { IDayEvents, ITableLightEvent } from '../interfaces';

export interface IAllDayContainerParams {
    readonly events: IDayEvents[];
}

@Directive()
export abstract class AllDayContainerBaseComponent extends EventContainerBaseComponent<IAllDayContainerParams> {

    /**
     * Открыть модальное окно с ивентом
     * @param {string | null | undefined} id
     * @returns {ITableLightEvent | null}
     * @protected
     */
    protected getEventById(id: string | null | undefined): ITableLightEvent | null {
        for (const day of this.data.events) {
            for (const e of day.events) {
                if (e.id === id) {
                    return e;
                }
            }
        }

        return null;
    }

    protected override clickToTime(event: PointerEvent): Date {
        const rect: DOMRect = this.elementRef.nativeElement.getBoundingClientRect();
        const clickX: number = event.clientX - rect.x;
        const width: number = this.elementRef.nativeElement.offsetWidth;
        const xPercent: number = clickX / width;

        return this.data.events[Math.floor(this.data.events.length * xPercent)].date;
    }
}
