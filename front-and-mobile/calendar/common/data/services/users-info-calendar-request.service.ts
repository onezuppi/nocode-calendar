import { AbResponseModel, CacheBaseService, CacheTypes, ContentType, IdentityRequestService } from '@abanking/core';
import { map, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { IUserInfoResponseModel, IUserSettingsRequestModel, IUserSettingsResponseModel } from '../response-models';
import { API_URL_TOKEN } from '../tokens/api-url.token';

@Injectable()
export class UsersInfoCalendarRequestService {
    public readonly endPoint: string = inject(API_URL_TOKEN);

    constructor(
        private readonly _identityRequestService: IdentityRequestService,
        private readonly _cacheService: CacheBaseService,
    ) {
    }

    /**
     * Получение информации о текущем пользователе
     * @return Observable<UserModel>
     */
    public getCurrentUser(): Observable<UserModel> {
        return this._identityRequestService.get<IUserInfoResponseModel>({
            url: `${this.endPoint}api/v1/public/client/user/info`,
        })
            .pipe(
                map((value: AbResponseModel<IUserInfoResponseModel>) => {
                    if (value.data) {
                        return new UserModel(value.data);
                    }

                    throw new Error('Не удалось получить информацию о текущем пользователе');
                }),
            );
    }

    /**
     * Получение информации о текущем пользователе с кешем
     * @param resetCache удаление кеша
     * @return Observable<UserModel>
     */
    public getCurrentUserWithCache(resetCache: boolean = false): Observable<UserModel> {
        const key: string = 'user';
        resetCache && this._cacheService.dataDeleteByKey(key);

        return this._cacheService.runCached({ type: CacheTypes.personal, key },
            () => this.getCurrentUser());
    }

    /**
     * Получение всех пользователей c кешем
     * @param resetCache удаление кеша
     * @return Observable<UserModel[]>
     */
    public getUsersWithCache(resetCache: boolean = false): Observable<UserModel[]> {
        const key: string = 'users';
        resetCache && this._cacheService.dataDeleteByKey(key);

        return this._cacheService.runCached({ type: CacheTypes.personal, key }, () => {
            return this.getUsers();
        });
    }

    /**
     * Получение всех пользователей
     * @return Observable<UserModel[]>
     */
    public getUsers(): Observable<UserModel[]> {
        return this._identityRequestService.get<IUserInfoResponseModel[]>({
            url: `${this.endPoint}api/v1/public/client/user/list`,
        })
            .pipe(
                map((value: AbResponseModel<IUserInfoResponseModel[]>) => {
                    if (value.data) {
                        return value.data.map(u => new UserModel(u));
                    }

                    throw new Error('Не удалось получить информацию о пользователях');
                }),
            );
    }

    /**
     * Получение всех пользователей
     * @return Observable<UserModel[]>
     */
    public setUserSettings(settings: IUserSettingsRequestModel): Observable<boolean> {
        return this._identityRequestService.post<boolean, IUserSettingsRequestModel>({
            url: `${this.endPoint}api/v1/public/client/user/settings`,
            body: settings,
            contentType: ContentType.json,
        })
            .pipe(
                map((value: AbResponseModel<boolean>) => !!value.data),
            );
    }
}
