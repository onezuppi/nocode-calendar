import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateGroupRequestModel, IEditGroupRequestModel } from '../../../data/request-models';


@Injectable()
export abstract class GroupManagerBaseService {

    /**
     * Добавить группу
     * @param {ITableEvent} event
     * @returns {Observable<void>}
     */
    public abstract add(event: ICreateGroupRequestModel): Observable<void>;

    /**
     * Редактировать группу
     * @param {ITableEvent} event
     * @returns {Observable<void>}
     */
    public abstract edit(event: IEditGroupRequestModel): Observable<void>;
}
