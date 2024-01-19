import { AbResponseModel, ContentType, IdentityRequestService } from '@abanking/core';
import { map, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { ICreateEventRequestModel, IEditEventRequestModel, IGetEventsRequestModel } from '../request-models';
import { IEventLightResponseModel, IEventResponseModel, IIdResponseModel } from '../response-models';
import { EventLightModel, EventModel } from '../models';
import { API_URL_TOKEN } from '../tokens/api-url.token';

@Injectable()
export class EventInfoCalendarRequestService {
    public readonly endPoint: string = inject(API_URL_TOKEN);

    constructor(
        private _identityRequestService: IdentityRequestService,
    ) {
    }

    /**
     * Создать событие
     * Observable<string>
     */
    public createEvent(event: ICreateEventRequestModel): Observable<string> {
        return this._identityRequestService.post<IIdResponseModel, ICreateEventRequestModel>({
            url: `${ this.endPoint }api/v1/public/client/event`,
            body: event,
            contentType: ContentType.json,
        })
            .pipe(
                map((value: AbResponseModel<IIdResponseModel>) => {
                    if (value.data) {
                        return value.data.id;
                    }

                    throw new Error('Не удалось создать событие');
                }),
            );
    }

    /**
     * Редактировать событие
     * @param event
     * @return Observable<string>
     */
    public editEvent(event: IEditEventRequestModel): Observable<string> {
        return this._identityRequestService.post<IIdResponseModel, IEditEventRequestModel>({
            url: `${ this.endPoint }api/v1/public/client/event/edit`,
            body: event,
            contentType: ContentType.json
        })
            .pipe(
                map((value: AbResponseModel<IIdResponseModel>) => {
                    if (value.data) {
                        return value.data.id;
                    }

                    throw new Error('Не удалось редактировать событие');
                }),
            );
    }

    /**
     * Удалить ивент
     * @param id
     * @return Observable<string>
     */
    public deleteEvent(id: string): Observable<boolean> {
        return this._identityRequestService.delete<boolean>({
            url: `${ this.endPoint }api/v1/public/client/event/${ id }`,
        })
            .pipe(
                map((value: AbResponseModel<boolean>) => !!value.data),
            );
    }

    /**
     * получить евент по его идентификатору
     * @param id
     * @return Observable<IEventByIdDto>
     */
    public getEventById(id: string): Observable<EventModel> {
        return this._identityRequestService.get<IEventResponseModel>({
            url: `${ this.endPoint }api/v1/public/client/event/${ id }`,
        })
            .pipe(
                map((value: AbResponseModel<IEventResponseModel>) => {
                    if (value.data) {
                        return new EventModel(value.data);
                    }

                    throw new Error('Не удалось получить событие по идентификатору');
                }),
            );
    }


    /**
     * Получить событие по id юзера
     * @param data IGetEventsRequestModel
     * @return Observable<EventLightModel[]>
     */
    public getEvents(data: IGetEventsRequestModel = {}): Observable<EventLightModel[]> {
        const params: { [key: string]: string | string[] } = (data.from && data.to)
            ? { from: data.from.toISOString(), to: data.to.toISOString() }
            : {};
        data.calendarIds && (params.calendarIdList = data.calendarIds);
        data.searchValue && (params.nameSearch = data.searchValue);

        return this._identityRequestService.get<IEventLightResponseModel[]>({
            url: data.userId
                ? `${ this.endPoint }api/v1/public/client/event/list/${ data.userId }`
                : `${ this.endPoint }api/v1/public/client/event/list`,
            params
        })
            .pipe(
                map((value: AbResponseModel<IEventLightResponseModel[]>) => {
                    if (value.data) {
                        return value.data.map(e => new EventLightModel(e));
                    }

                    throw new Error('Календарь отсутсвует');
                }),
            );
    }
}
