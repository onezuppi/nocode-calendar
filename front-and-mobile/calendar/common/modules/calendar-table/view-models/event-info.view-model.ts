import { CalendarModel, EventModel, UserModel } from '../../../data';
import { replayItems } from '../constants';
import dayjs from 'dayjs';

export interface IEventInfoData {
    user: UserModel;
    users: UserModel[];
    event: EventModel;
    calendars: CalendarModel[];
}


export class EventInfoViewModel {
    public readonly isCreator: boolean;
    public readonly time: string;
    public readonly users: Array<{ name: string, id: string }> = [];
    public readonly place: string = '';
    public readonly eventRecurrence: string = '';
    public readonly calendar: string = '';
    public readonly event: EventModel;

    constructor(
        protected readonly data: IEventInfoData
    ) {
        this.event = data.event;
        this.isCreator = data.user.mainCalendarId === data.event.calendarId;
        this.place = this.data.event.place?.login ?? '';
        this.eventRecurrence = replayItems.find(event =>
            event.value === (this.data.event?.eventRecurrence?.interval))?.name ?? '';
        this.time = this.getTime();
        this.calendar = data.calendars.find((calendar: CalendarModel) => calendar.id === this.data.event.calendarId)?.name ?? 'Неопознанный календарь';

        const userIdList: string[] = this.data.event.userIdList?.map(item => item.id) ?? [];

        this.users =  data.users.map(user => ({ name: user.fullName, id: user.id }))
            .filter(user => userIdList?.includes(user.id));
    }

    /**
     * Показать время пользователю
     * @return string
     */
    public getTime(): string {
        if (this.data.event.isAllDay) {
            if (dayjs( this.data.event.dateStartUtc).isSame(this.data.event.dateEndUtc, 'day')) {
                return `${ this.data.event.dateStartUtc.toLocaleDateString() }, Весь день`;
            }

            return `${ this.data.event.dateStartUtc.toLocaleDateString() } — ${ this.data.event.dateEndUtc.toLocaleDateString() }, Весь день`;
        }

        return `${ this.data.event.dateStartUtc.toLocaleString() } — ${ this.data.event.dateEndUtc.toLocaleString() }`;
    }
}
