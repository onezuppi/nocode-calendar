import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { DestroyService, memoize } from '@abanking/core';
import { AllDayContainerBaseComponent } from '../../../../../submodule';

@Component({
    selector: 'app-calendar-event-container',
    templateUrl: './calendar-all-day-event-container.web.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/calendar-all-day-event-container.master.web.component.scss'],
    providers: [
        DestroyService,
    ]
})
export class CalendarAllDayEventContainerWebComponent extends AllDayContainerBaseComponent {
    @HostBinding('class')
    public get cls(): string {
        return this.tableData.view;
    }

    /**
     * Подсчет ширины кнопки
     * @returns {number}
     */
    @memoize()
    public get btnWidth(): number {
        return 100 / this.data.events.length;
    }

    /**
     * Подсчет отступа
     * @param {number} day
     * @returns {number}
     */
    @memoize()
    public getLeft(day: number): number {
        return day / this.data.events.length * 100;
    }
}
