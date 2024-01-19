import { ITableEvent } from '../interfaces';
import { ICreateEventRequestModel } from '../../../data/request-models';

/**
 * Маппер события календаря в событие для сервера
 * @param {ITableEvent} event
 * @returns {ICreateEventRequestModel}
 */
export function tableEventToServerMapper(event: ITableEvent): ICreateEventRequestModel {
    return {
        calendarId: event.calendarId,
        userIdList: event.userList.map(user => user.id),
        name: event.name,
        description: event.description,
        dateStartUtc: event.dateStartUtc.toISOString(),
        dateEndUtc: event.dateEndUtc.toISOString(),
        placeId: event.place?.id,
        color: event.color,
        eventRecurrence: event?.eventRecurrence ? {
            interval: event.eventRecurrence.interval
        } : null
    };
}
