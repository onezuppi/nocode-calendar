export interface ICreateEventRequestModel {
    calendarId: string;
    userIdList: string[];
    name: string;
    description?: string;
    dateStartUtc: string;
    dateEndUtc: string;
    placeId?: string;
    color: string;
    eventRecurrence?: {
        interval: number | null
    } | null;
}
