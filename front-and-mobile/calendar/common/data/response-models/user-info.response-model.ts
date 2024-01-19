import { ViewTypesEnum } from '../../modules';

export interface IUserInfoLightResponseModel {
    /** Идентификатор пользователя */
    id: string;
    /** Логин */
    login: string;
    /** ФИО */
    fullName: string;
}


export interface IUserInfoResponseModel {
    /** Идентификатор пользователя */
    id: string;
    /** Тип пользователя */
    type: UserType;
    /** Логин */
    login: string;
    /** ФИО */
    fullName: string;
    /** Основной айдишник календаря */
    mainCalendarId: string;
    /** Настройки пользователя */
    settings: IUserSettingsResponseModel;
}

export interface IUserSettingsResponseModel {
    selectedTabEnum: ViewTypesEnum | number;
    selectedCalendarIdList: string[];
}

export interface IUserSettingsRequestModel {
    /** Текущие настройки пользователя */
    settings: IUserSettingsResponseModel;
}

export enum UserType {
    user = 0,
    meetingRoom = 1
}

export interface IUserOptionsDto {
    [setting: string]: any
}
