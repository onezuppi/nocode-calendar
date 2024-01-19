import { IUserCalendarResponseModel } from '../response-models';
import { EventLightModel } from './event-light.model';

export class CalendarModel {
    /** Идентификатор календаря */
    public id: string;
    /** Название календаря */
    public name: string;
    public color: string;

    constructor(model: IUserCalendarResponseModel) {
        this.id = model.id;
        this.name = model.name;
        this.color = model.color;
    }
}
