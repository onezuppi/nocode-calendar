import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ModalManagerBaseService } from '../../modals';
import { GroupManagerBaseService } from './group-manager.base.service';
import { ICreateGroupRequestModel, IEditGroupRequestModel } from '../../../data/request-models';
import { GroupInfoCalendarRequestService } from '../../../data';


@Injectable()
export class GroupManagerService extends GroupManagerBaseService {
    constructor(
        public readonly groupService: GroupInfoCalendarRequestService,
        public readonly toastService: ModalManagerBaseService,
    ) {
        super();
    }

    /** @inheritDoc */
    public add(group: ICreateGroupRequestModel): Observable<void> {
        return this.groupService.createGroup(group)
            .pipe(
                tap(() => this.toastService.showToast({
                    message: 'Группа создана',
                    type: 'success',
                })),
                map(() => void 0),
            );
    }

    /** @inheritDoc */
    public edit(group: IEditGroupRequestModel): Observable<void> {
        return this.groupService.editGroup(group)
            .pipe(
                tap(() => this.toastService.showToast({
                    message: 'Группа изменена',
                    type: 'success',
                })),
                map(() => void 0),
            );
    }
}
