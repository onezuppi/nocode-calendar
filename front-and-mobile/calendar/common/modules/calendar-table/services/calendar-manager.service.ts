import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { CalendarInfoRequestService } from '../../../data';
import { ModalManagerBaseService } from '../../modals';
import { CalendarManagerBaseService } from './calendar-manager.base.service';
import { ICreateCalendarRequestModel, IEditCalendarRequestModel } from '../../../data/request-models';


@Injectable()
export class CalendarManagerService extends CalendarManagerBaseService {
    constructor(
        public readonly calendarService: CalendarInfoRequestService,
        public readonly toastService: ModalManagerBaseService,
    ) {
        super();
    }

    /** @inheritDoc */
    public add(event: ICreateCalendarRequestModel): Observable<void> {
        return this.calendarService.createCalendar(event)
            .pipe(
                tap(() => this.toastService.showToast({
                    message: 'Календарь создан',
                    type: 'success',
                })),
                map(() => void 0),
            );
    }

    /** @inheritDoc */
    public delete(id: string): Observable<void> {
        return this.calendarService.deleteCalendar(id)
            .pipe(
                tap(() => this.toastService.showToast({
                    message: 'Календарь удален',
                    type: 'success',
                })),
                map(() => void 0),
            );
    }

    /** @inheritDoc */
    public edit(event: IEditCalendarRequestModel): Observable<void> {
        return this.calendarService.editCalendar(event)
            .pipe(
                tap(() => this.toastService.showToast({
                    message: 'Календарь изменен',
                    type: 'success',
                })),
                map(() => void 0),
            );
    }
}
