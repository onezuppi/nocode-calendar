import { AbResponseModel, ContentType, IdentityRequestService } from '@abanking/core';
import { map, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { CalendarModel } from '../models';
import { ICreateCalendarRequestModel, IEditCalendarRequestModel, IUserCalendarListResponse } from '../request-models';
import { IIdResponseModel, IUserCalendarResponseModel } from '../response-models';
import { IDateRange } from '../../modules/calendar-table/utils';
import { RequestResponseType } from '@abanking/core';
import { FileModel } from '@abanking/core';
import { API_URL_TOKEN } from '../tokens/api-url.token';


@Injectable()
export class CalendarInfoRequestService {
    public readonly endPoint: string = inject(API_URL_TOKEN);

    constructor(
        private _identityRequestService: IdentityRequestService,
    ) {
    }

    /**
     * Получение всех календарей текущего пользователя
     * @param type 'list' | 'mine'
     * @return Observable<ICalendar>
     */
    public getAllCalendars(type: 'list' | 'mine' = 'mine'): Observable<CalendarModel[]> {
        return this._identityRequestService.get<IUserCalendarResponseModel[]>({
            url: `${ this.endPoint }api/v1/public/client/calendar/${ type }`,
        })
            .pipe(
                map((value: AbResponseModel<IUserCalendarResponseModel[]>) => {
                    if (value.data) {
                        return value.data.map(c => new CalendarModel(c));
                    }

                    throw new Error('Календарь отсутсвует');
                }),
            );
    }

    /**
     * Создания нового календаря пользователем
     * @param data
     * @return Observable<boolean>
     */
    public createCalendar(data: ICreateCalendarRequestModel): Observable<string> {
        return this._identityRequestService.post<IIdResponseModel, ICreateCalendarRequestModel>({
            url: `${ this.endPoint }api/v1/public/client/calendar`,
            body: data,
            contentType: ContentType.json,
        })
            .pipe(
                map((value: AbResponseModel<IIdResponseModel>) => {
                    if (value.data) {
                        return value.data.id;
                    }

                    throw new Error('Ошибка при создании нового календаря');
                }),
            );
    }

    /**
     * Удаление календаря по id
     * @param id
     * @return Observable<boolean>
     */
    public deleteCalendar(id: string): Observable<boolean> {
        return this._identityRequestService.delete<boolean>({
            url: `${ this.endPoint }api/v1/public/client/calendar`,
            //@ts-ignore
            body: { id },
            contentType: ContentType.json,
        })
            .pipe(
                map((value: AbResponseModel<boolean>) => !!value.data),
            );
    }

    /**
     * Изменить календарь по id
     * @param data IEditCalendarRequestModel
     * @returns Observable<boolean>
     */
    public editCalendar(data: IEditCalendarRequestModel): Observable<boolean> {
        return this._identityRequestService.post<boolean, IEditCalendarRequestModel>({
            url: `${ this.endPoint }api/v1/public/client/calendar/edit`,
            body: data,
            contentType: ContentType.json,
        })
            .pipe(
                map((value: AbResponseModel<boolean>) => !!value.data),
            );
    }

    /**
     * забиндить календари к календарю пользователя
     * @param calendarIdItems
     */
    public bindCalendar(calendarIdItems: string[]): Observable<IUserCalendarListResponse> {
        return this._identityRequestService.post<IUserCalendarListResponse, string[]>({
            url: `${ this.endPoint }api/v1/public/client/calendar/bind`,
            params: {
                calendarList: calendarIdItems
            },
            contentType: ContentType.json,
        })
            .pipe(
                map((value: AbResponseModel<IUserCalendarListResponse>) => {
                    if (value.data) {
                        return value.data;
                    }

                    throw new Error('Ошибка при создании нового календаря');
                }),
            );
    }

    /**
     * забиндить календари к календарю пользователя
     * @param calendarIdItems
     */
    public unbindCalendar(calendarIdItems: string[]): Observable<IUserCalendarListResponse> {
        return this._identityRequestService.post<IUserCalendarListResponse, string[]>({
            url: `${ this.endPoint }api/v1/public/client/calendar/unbind`,
            params: {
                calendarList: calendarIdItems
            },
            contentType: ContentType.json,
        })
            .pipe(
                map((value: AbResponseModel<IUserCalendarListResponse>) => {
                    if (value.data) {
                        return value.data;
                    }

                    throw new Error('Ошибка при создании нового календаря');
                }),
            );
    }

    /**
     * Скачивание календаря
     * @param calendarIdList
     * @param {IDateRange} range
     * @returns {Observable<Blob>}
     */
    public downloadCalendar(calendarIdList: string[], range: IDateRange): Observable<FileModel> {
        const params: { [key: string]: string | string[] } = {
            from: range.from.toISOString(),
            to: range.to.toISOString(),
            calendarIdList
        };

        return this._identityRequestService.get<Blob>({
            url: `${ this.endPoint }api/v1/public/client/calendar/download`,
            params,
            responseType: RequestResponseType.blob,
        })
            .pipe(
                map((({ data }: AbResponseModel<Blob>) => {
                    const file: FileModel = FileModel.fromBlob(data!);
                    file.originFileName = 'calendar.ics';
                    file.extension = '';

                    return file;
                }))
            );
    }
}
