import { IUserInfoLightResponseModel } from './user-info.response-model';

export interface IResponseRecurrence {
    readonly dateStart: string | null;
    readonly dateEnd: string | null;
    readonly interval: number;
}

export interface ICalendarResponseModel {
    name: string;
    color: string;
    id: string;
}


export interface IEventResponseModel {
    readonly id: string;
    readonly eventId: string;
    readonly calendar: ICalendarResponseModel;
    readonly userList: IUserInfoLightResponseModel[];
    readonly name: string;
    readonly description?: string;
    readonly dateStartUtc: string;
    readonly dateEndUtc: string;
    readonly place?: IUserInfoLightResponseModel;
    readonly color: string;
    readonly eventRecurrence?: IResponseRecurrence | null;
}
