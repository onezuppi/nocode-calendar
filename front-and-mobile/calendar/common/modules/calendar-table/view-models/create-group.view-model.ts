import {
    AbankingValidators,
    FormBaseViewModel,
    IControl,
    ISelectItem, MultiSelectControlV2ViewModel,
    SelectControlViewModel,
    TextControlViewModel
} from '@abanking/ui';
import { IEditGroupRequestModel } from '../../../data/request-models';
import { IUserGroupResponseModel, IUserInfoResponseModel, UserModel, UserType } from '../../../data';
import { takeUntil, tap } from 'rxjs';

export class CreateGroupViewModel extends FormBaseViewModel<IEditGroupRequestModel> {
    public groupId: string | undefined = '';
    public readonly users: ISelectItem[] = [];
    public readonly groups: Array<ISelectItem<IUserGroupResponseModel>> = [];

    constructor(
        protected usersAndGroups: UserModel[],
        protected responseGroup: IUserGroupResponseModel[]) {
        super(() => ({} as IEditGroupRequestModel));

        this.users = this.usersAndGroups
            .filter((u: UserModel) => u.type === UserType.user)
            .map((u: UserModel) => ({ name: u.fullName, value: u.id }));

        this.groups = this.responseGroup
            .map((u: IUserGroupResponseModel) => ({ name: u.name, value: u }));

        this.initialize();
        this.listenGroupChanges();
    }

    /** @inheritDoc */
    public updateModel(model: IEditGroupRequestModel): void {
        if (this.groupId) {
            model.groupId = this.groupId;
        }
        model.name = this.getFormValue('name');
        model.userGuidList = this.getFormValue('userGuidList').map((item: ISelectItem) => item.value);
    }

    /** @inheritDoc */
    public override fromModel(model: IEditGroupRequestModel): void {
        if (!model) {
            return;
        }

        this.setFormValue('userGuidList',
            this.users
                .filter((user: ISelectItem) => model.userGuidList.includes(user.value))
                .map((user: ISelectItem) => ({ name: user.name, value: user.value }))
        );
        this.setFormValue('name', model.name);
        this.groupId = model.groupId;
    }

    /** @inheritDoc */
    protected getControls(): IControl[] {
        return [
            new TextControlViewModel({
                name: 'name',
                options: {
                    label: 'Название группы'
                },
                validators: [AbankingValidators.required()]
            }),
            new MultiSelectControlV2ViewModel({
                name: 'userGuidList',
                options: {
                    label: 'Пользователи'
                },
                stringify: (value: ISelectItem) => value.name,
                validators: [AbankingValidators.required()]
            }),
            new SelectControlViewModel({
                name: 'groups',
                options: {
                    label: 'Группы'
                },
                listItems: this.groups,
            })
        ];
    }

    /**
     * Прослушка изменений контрола выбора группы
     * @private
     */
    private listenGroupChanges(): void {
        this.getControl('groups').valueChanges$
            .pipe(
                tap((item: ISelectItem<IUserGroupResponseModel>) => {
                    this.fromModel({
                        groupId: item.value.id,
                        name: item.value.name,
                        userGuidList: item.value.userList?.map((user: IUserInfoResponseModel) => user.id),
                    });
                }),
                takeUntil(this.onDestroy$)
            )
            .subscribe();
    }
}
