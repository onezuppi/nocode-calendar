import { IdentityRequestService } from '@abanking/core';
import { map, Observable } from 'rxjs';
import { AbResponseModel, ContentType } from '@abanking/core';
import { inject, Injectable } from '@angular/core';
import { IIdResponseModel, IUserGroupResponseModel } from '../response-models';
import { ICreateGroupRequestModel, IEditGroupRequestModel } from '../request-models';
import { CacheBaseService, CacheTypes } from '@abanking/core';
import { API_URL_TOKEN } from '../tokens/api-url.token';

@Injectable()
export class GroupInfoCalendarRequestService {
    public readonly endPoint: string = inject(API_URL_TOKEN);

    constructor(
        private _identityRequestService: IdentityRequestService,
        private _cacheService: CacheBaseService,
    ) {
    }

    /**
     * Получение всех групп пользователей
     * @return Observable<IUserGroupResponseModel>
     */
    public getGroups(): Observable<IUserGroupResponseModel[]> {
        return this._cacheService.runCached({ type: CacheTypes.public, key: 'usersGroups' }, () => {
            return this._identityRequestService.get<IUserGroupResponseModel[]>({
                url: `${this.endPoint}api/v1/public/client/user/groups`,
            })
                .pipe(
                    map((value: AbResponseModel<IUserGroupResponseModel[]>) => {
                        if (value.data) {
                            return value.data;
                        }

                        throw new Error('Не удалось получить информацию о всех группах');

                    })
                );
        });
    }

    /**
     * Создание группы
     * @param group
     * @return Observable<string>
     */
    public createGroup(group: ICreateGroupRequestModel): Observable<string> {
        return this._identityRequestService.post<IIdResponseModel, ICreateGroupRequestModel>({
            url: `${this.endPoint}api/v1/public/client/user/group`,
            body: group,
            contentType: ContentType.json
        })
            .pipe(
                map((value: AbResponseModel<IIdResponseModel>) => {
                    if (value.data) {
                        return value.data.id;
                    }

                    throw new Error('Не удалось создать группу');
                })
            );
    }

    /**
     * Редактирование группы
     * @param group
     * @return Observable<string>
     */
    public editGroup(group: IEditGroupRequestModel): Observable<string> {
        return this._identityRequestService.post<IIdResponseModel, IEditGroupRequestModel>({
            url: `${this.endPoint}api/v1/public/client/user/group/edit`,
            body: group,
            contentType: ContentType.json
        })
            .pipe(
                map((value: AbResponseModel<IIdResponseModel>) => {
                    if (value.data) {
                        return value.data.id;
                    }

                    throw new Error('Не удалось создать группу');

                })
            );
    }
}
