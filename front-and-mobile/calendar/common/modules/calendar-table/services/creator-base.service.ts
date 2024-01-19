import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventLightModel } from '../../../data';

@Injectable()
export abstract class CreatorBaseService {
    /**
     * Создать событие
     * @param {EventLightModel} event
     * @param {Date} from
     * @param {Date} to
     * @returns {Observable<void>}
     */
    public abstract createEvent(event?: EventLightModel, from?: Date, to?: Date): Observable<void>;

    /**
     * Показать существующее событие
     * @param {EventLightModel} event
     * @returns {Observable<void>}
     */
    public abstract showEvent(event: EventLightModel): Observable<void>;

    /**
     * Создать группу
     * @returns {Observable<void>}
     */
    public abstract createGroup(isEdit?: boolean): Observable<void>;

    /**
     * Создать календарь
     * @returns {Observable<void>}
     */
    public abstract createCalendar(isEdit?: boolean): Observable<void>;
}
