import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { memoize } from '@abanking/core';
import { IDayEvents, ILoadEventsParams, ITableEvent, ITableLightEvent } from '../interfaces';
import { EventModel } from '../../../data';


@Injectable()
export abstract class EventManagerBaseService {
    /**
     * События календаря
     * @returns {Observable<IDayEvents[]>}
     */
    @memoize()
    public get events$(): Observable<IDayEvents[]> {
        return this.eventsBhs$.asObservable();
    }

    /**
     * Состояние загрузки
     * @returns {Observable<boolean>}
     */
    @memoize()
    public get isLoading$(): Observable<boolean> {
        return this.isLoadingBhs$.asObservable();
    }

    protected readonly eventsBhs$: BehaviorSubject<IDayEvents[]> = new BehaviorSubject<IDayEvents[]>([]);
    protected readonly isLoadingBhs$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


    /**
     * Загрузить события календаря
     * @param {ILoadEventsParams} params
     * @returns {Observable<void>}
     */
    public abstract load(params: ILoadEventsParams): Observable<void>;

    /**
     * Добавить событие
     * @param event
     * @returns {Observable<void>}
     */
    public abstract add(event: ITableEvent): Observable<void>;

    /**
     * Редактировать событие
     * @param event
     * @returns {Observable<void>}
     */
    public abstract edit(event: ITableEvent): Observable<void>;

    /**
     * Удалить событие
     * @param id
     * @returns {Observable<void>}
     */
    public abstract delete(id: string): Observable<void>;

    /**
     * Получить событие по id
     * @param {string} id
     * @returns {Observable<EventModel | null>}
     */
    public abstract getById(id: string): Observable<EventModel>;
}
