import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DestroyService } from '@abanking/core';
import { OneDayEventContainerBaseComponent } from '../../../../../../../submodule';
import dayjs from 'dayjs';

@Component({
    selector: 'app-calendar-event-container',
    templateUrl: './calendar-event-container.mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/calendar-event-container.master.mobile.component.scss'],
    providers: [
        DestroyService,
    ]
})
export class CalendarEventContainerMobileComponent extends OneDayEventContainerBaseComponent {
    /**
     * Перевод клика во время
     * @param {PointerEvent} event - событие клик
     * @returns {Date} - время ивента
     */
    protected override clickToTime(event: PointerEvent): Date {
        const rect: DOMRect = this.elementRef.nativeElement.getBoundingClientRect();
        const clickY: number = this.elementRef.nativeElement.scrollTop + event.clientY - rect.y;
        const height: number = this.elementRef.nativeElement.offsetHeight;
        const yPercent: number = clickY / height;
        const secondsInDay: number = 24 * 60 * 60;
        const time: number = yPercent * secondsInDay;
        const hours: number = Math.floor(time / 3600);
        const minutes: number = Math.floor((time % 3600) / 60);

        return dayjs(this.data.date).clone().set('h', hours).set('m', minutes).toDate();
    }
}
