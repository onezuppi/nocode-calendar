import { IEventLightResponseModel } from './event-light.response-model';


export interface IUserCalendarResponseModel {
    /** Идентификатор календаря */
    id: string;
    /** Название календаря */
    name: string;
    /** Упрощенный массив объектов evento'в */
    eventList: IEventLightResponseModel[];
    /** цвет */
    color: string;
}
