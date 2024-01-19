import { IUserInfoResponseModel, IUserSettingsResponseModel, UserType } from '../response-models';

export class UserModel {
    /** Идентификатор пользователя */
    public readonly id: string;
    /** Тип пользователя */
    public readonly type: UserType;
    /** Логин */
    public readonly login: string;
    /** ФИО */
    public readonly fullName: string;
    /** Основной айдишник календаря */
    public readonly mainCalendarId: string;
    /** Настройки пользователя */
    public readonly settings: IUserSettingsResponseModel;

    constructor(model: IUserInfoResponseModel) {
        this.id = model.id;
        this.type = model.type;
        this.login = model.login;
        this.fullName = model.fullName;
        this.mainCalendarId = model.mainCalendarId;
        this.settings = model.settings;
    }
}
