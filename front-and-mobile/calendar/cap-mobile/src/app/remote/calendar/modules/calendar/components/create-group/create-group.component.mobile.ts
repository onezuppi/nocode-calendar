import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IModalArgsContainer, IModalComponent } from '@abanking/ui';
import {
    CreateGroupViewModel,
    GroupInfoCalendarRequestService,
    GroupManagerBaseService,
    IEditGroupRequestModel,
    IUserGroupResponseModel,
    UserModel,
    UsersInfoCalendarRequestService,
} from '../../../../../../../submodule';
import { DestroyService } from '@abanking/core';
import { forkJoin, map, Observable, take, tap } from 'rxjs';

@Component({
    templateUrl: 'create-group.component.mobile.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/create-group.master.mobile.scss'],
    providers: [
        DestroyService,
    ]
})
export class CreateGroupComponentMobile extends IModalComponent {
    public createGroupViewModel$: Observable<CreateGroupViewModel> =
        forkJoin([
            this._usersInfoStateService.getUsers(),
            this._groupInfoCalendarRequestService.getGroups(),
        ])
            .pipe(
                map(([users, groups]: [UserModel[], IUserGroupResponseModel[]]) => new CreateGroupViewModel(users, groups)),
                tap(model => this.group && model.fromModel(this.group))
            );

    public isEdit: boolean = !!this._modalArgs.dict.isEdit;
    public group?: IEditGroupRequestModel = this._modalArgs.dict.group;

    constructor(
        private _modalArgs: IModalArgsContainer,
        private _groupManager: GroupManagerBaseService,
        private _usersInfoStateService: UsersInfoCalendarRequestService,
        private _groupInfoCalendarRequestService: GroupInfoCalendarRequestService,
    ) {
        super();
    }

    /**
     * Создание ивента
     */
    public create(model: CreateGroupViewModel): void {
        if (!model.valid) {
            console.log('Некорректные данные');

            return;
        }

        if (this.isEdit) {
            this._groupManager.edit(model.toModel()).pipe(take(1)).subscribe();
        } else {
            this._groupManager.add(model.toModel()).pipe(take(1)).subscribe();
        }
        this.model.closeLayout(true);
    }

    /**
     * Закрыть модальное окно
     */
    public close(): void {
        this.model.closeLayout(true);
    }
}
