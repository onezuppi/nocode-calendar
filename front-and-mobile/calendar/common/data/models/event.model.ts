import {
    ICalendarResponseModel,
    IEventResponseModel,
    IResponseRecurrence,
    IUserInfoLightResponseModel,
} from '../response-models';
import { EventLightModel } from './event-light.model';


export class EventModel extends EventLightModel {
    public readonly calendar: ICalendarResponseModel;
    public readonly userIdList: IUserInfoLightResponseModel[];
    public readonly description?: string;
    public readonly place?: IUserInfoLightResponseModel;
    public readonly eventRecurrence?: IResponseRecurrence | null;

    constructor(model: IEventResponseModel) {
        super({ ...model, calendarId: model.calendar.id });
        this.calendar = model.calendar;
        this.userIdList = model.userList;
        this.description = model.description;
        this.place = model.place;
        this.eventRecurrence = model.eventRecurrence;
    }
}
