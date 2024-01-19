import { IEventLightResponseModel } from '../response-models';
import dayjs from 'dayjs';

/**
 * Проверка времени на весь день
 * @param from
 * @param to
 * @return boolean
 */
export function isAllDay(from: string | Date, to: string | Date): boolean {
    return (dayjs(from).subtract(dayjs(from).utcOffset(), 'm').format('HH:mm') === '00:00'
        && dayjs(to).subtract(dayjs(to).utcOffset(), 'm').format('HH:mm') === '00:00');
}

export class EventLightModel {
    public readonly color: string;
    public readonly dateEndUtc: Date;
    public readonly dateStartUtc: Date;
    public readonly id: string;
    public readonly name: string;
    public readonly calendarId: string;
    public readonly isAllDay: boolean;

    constructor(model: IEventLightResponseModel) {
        this.color = model.color;
        this.dateEndUtc = dayjs(model.dateEndUtc).toDate();
        this.dateStartUtc = dayjs(model.dateStartUtc).toDate();
        this.id = model.id;
        this.name = model.name;
        this.calendarId = model.calendarId;
        this.isAllDay = isAllDay(this.dateStartUtc, this.dateEndUtc);
    }
}
