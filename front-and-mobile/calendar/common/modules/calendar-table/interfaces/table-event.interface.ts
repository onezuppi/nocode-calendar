export interface ITableLightEvent {
    id: string;
    calendarId: string;
    name: string;
    dateStartUtc: Date;
    dateEndUtc: Date;
    color: string;
    isAllDay: boolean;
}

export interface ICalendarInfo {
    name: string,
    color: string,
    id: string
}

export interface IUserInfo {
    id: string;
    login: string;
    fullName: string;
}

export interface ITableEvent extends ITableLightEvent {
    calendar: ICalendarInfo;
    userList: IUserInfo[];
    userIdList: IUserInfo[];
    name: string;
    description?: string,
    dateStartUtc: Date,
    dateEndUtc: Date,
    place?: IUserInfo;
    color: string;
    eventRecurrence: {
        interval: number
    } | null
}

export interface IDayEvents {
    events: ITableLightEvent[];
    date: Date;
}

export interface ILoadEventsParams {
    from: Date;
    to: Date;
    userId?: string;
    calendarIds?: string[];
}
