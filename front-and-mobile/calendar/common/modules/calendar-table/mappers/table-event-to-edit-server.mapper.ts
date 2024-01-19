import { ITableEvent } from '../interfaces';
import { IEditEventRequestModel } from '../../../data/request-models';

/**
 * Маппер события календаря в событие для сервера
 * @param {ITableEvent} event
 * @returns {IEditEventRequestModel}
 */
export function tableEventToEditServerMapper(event: ITableEvent): IEditEventRequestModel {
    return {
        eventId: event.id,
        calendarId: event.calendar?.id ?? event.calendarId,
        userIdList: event.userList.map(user => user.id),
        name: event.name,
        description: event.description,
        dateStartUtc: event.dateStartUtc.toISOString(),
        dateEndUtc: event.dateEndUtc.toISOString(),
        placeId: event.place?.id,
        color: event.color,
        eventRecurrence: event?.eventRecurrence?.interval ? {
            interval: event?.eventRecurrence?.interval
        } : null
    };
}
