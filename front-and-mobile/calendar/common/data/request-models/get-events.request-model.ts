export interface IGetEventsRequestModel {
    userId?: string;
    from?: Date;
    to?: Date;
    calendarIds?: string[];
    searchValue?: string;
}
