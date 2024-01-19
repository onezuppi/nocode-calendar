import { IUserInfoResponseModel } from './user-info.response-model';

export interface IUserGroupResponseModel {
    /** Идентификатор группы */
    id: string;
    /** Название группы */
    name: string;
    /** Массив пользователей привязанных в группах */
    userList: IUserInfoResponseModel[];
}
