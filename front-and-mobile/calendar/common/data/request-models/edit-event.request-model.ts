import { ICreateEventRequestModel } from './create-event.request-model';

export interface IEditEventRequestModel extends ICreateEventRequestModel {
    eventId: string;
}
