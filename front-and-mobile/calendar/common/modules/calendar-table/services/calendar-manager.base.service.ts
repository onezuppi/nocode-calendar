import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateCalendarRequestModel, IEditCalendarRequestModel } from '../../../data/request-models';

@Injectable()
export abstract class CalendarManagerBaseService {

    /**
     * Добавить событие
     * @param {ITableEvent} event
     * @returns {Observable<void>}
     */
    public abstract add(event: ICreateCalendarRequestModel): Observable<void>;

    /**
     * Редактировать событие
     * @param {ITableEvent} event
     * @returns {Observable<void>}
     */
    public abstract edit(event: IEditCalendarRequestModel): Observable<void>;

    /**
     * Удалить событие
     * @param {string} id
     * @returns {Observable<void>}
     */
    public abstract delete(id: string): Observable<void>;
}
