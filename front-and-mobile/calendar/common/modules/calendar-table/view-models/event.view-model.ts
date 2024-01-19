import { AbankingValidators, CheckboxControlViewModel, DatePickerControlViewModel, FormBaseViewModel, IControl, IControlValidator, ISelectItem, SelectAutocompleteControlV2ViewModel, SelectControlViewModel, TextAreaControlViewModel, TextControlViewModel } from '@abanking/ui';
import dayjs, { Dayjs } from 'dayjs';
import { CALENDAR_COLORS, replayItems } from '../constants';
import { CalendarModel, isAllDay, IUserGroupResponseModel, IUserInfoResponseModel, UserModel } from '../../../data';
import { ITableEvent, IUserInfo } from '../interfaces';
import { parseDateFromModel, parseDateToModel } from '../utils';
import { MultiSelectControlV2ViewModel } from '@abanking/ui';
import { tap, takeUntil } from 'rxjs';

const timeValidator = (): IControlValidator => AbankingValidators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Неверный формат времени');

export class EventViewModel extends FormBaseViewModel<ITableEvent> {
    public id: string | undefined;

    public groupsAndUsers: Array<ISelectItem<any>> = [];
    public groupsWithUsers: Array<{ name: string, users: string[] }> = [];

    constructor(
        protected readonly users: UserModel[],
        protected readonly calendars: CalendarModel[],
        protected readonly currentUser: UserModel,
        protected readonly groups: IUserGroupResponseModel[],
        protected readonly from?: Date,
        protected readonly to?: Date
    ) {
        super(() => ({} as ITableEvent));
        this.initialize();

        this.groups.forEach((group: IUserGroupResponseModel) => {
            this.groupsAndUsers.push({ name: group.name, value: group.id });
        });

        this.users
            .filter((item: UserModel) => item.type === 0)
            .forEach((user: UserModel) => {
                this.groupsAndUsers.push({ name: user?.fullName, value: user, });
            });

        this.listenChangesOfUsersList();
    }

    /** @inheritDoc */
    public override fromModel(model: ITableEvent): void {
        this.setFormValue('name', model.name);
        model.place?.id &&
            this.setFormValue('place', (this.getControl('place') as SelectControlViewModel).listItems.find((item: ISelectItem) => item.value === model.place?.id));
        this.setFormValue('description', model.description ?? '');
        this.id = model.id;

        const timeStart: { date: Date, time: string } = parseDateFromModel(model.dateStartUtc);
        const timeEnd: { date: Date, time: string } = parseDateFromModel(model.dateEndUtc);

        this.setFormValue('dateStart', timeStart.date);
        this.setFormValue('dateEnd', timeEnd.date);
        this.setFormValue('description', model.description ?? '');
        if (model.userList) {
            this.setFormValue('userIdList', model.userList?.map((u) => ({ name: u.fullName, value: u })));
        } else if (model.userIdList) {
            this.setFormValue('userIdList', model.userIdList?.map((u) => ({ name: u.fullName, value: u })));
        }
        this.setFormValue('color', CALENDAR_COLORS.find(color => color.value === model.color)?.name ?? CALENDAR_COLORS[1].name);
        this.setFormValue('userCalendar', this.calendars.find((item: CalendarModel) => model.calendarId === item.id) ?? { name: '', value: '' });
        this.setFormValue('isAllDay', model.isAllDay);
        this.getControl('isAllDay').setValue(isAllDay(timeStart.date, timeEnd.date), true, false);
        this.setFormValue('timeEnd', timeEnd.time);
        this.setFormValue('timeStart', timeStart.time);
        this.setFormValue('replay', model?.eventRecurrence?.interval ? replayItems.find((item: ISelectItem<number>) => item.value === model.eventRecurrence?.interval) : null);
    }

    /**
     * Обновить модель
     * @param model
     */
    public updateModel(model: ITableEvent): void {
        model.name = this.getFormValue('name');
        model.place = {
            login: this.getFormValue('place')?.value,
            fullName: this.getFormValue('place')?.value,
            id: this.getFormValue('place')?.value,
        };
        model.description = this.getFormValue('description');

        const groupsIdList: string[] = this.groups?.map((group: IUserGroupResponseModel) => group.id);
        const userList: IUserInfo[] = [];

        const isUserInFinalList = (id: string): boolean => {
            return !!userList.find((user: IUserInfo) => user.id === id);
        };

        this.getFormValue('userIdList')?.forEach((item: ISelectItem<IUserInfo | string>) => {
            if (groupsIdList.includes(item.value as string)) {
                return this.groups.find((group: IUserGroupResponseModel) => item.value === group.id)?.userList?.forEach((user: IUserInfoResponseModel | undefined) => {
                    if (user?.id && !isUserInFinalList(user.id)) {
                        userList.push(user);
                    }
                });
            }

            if (isUserInFinalList((item.value as IUserInfo).id)) {
                return;
            }

            userList.push(item.value as IUserInfo);
        });

        if (!userList.length) {
            userList.push(this.currentUser);
        }

        model.userList = userList;

        model.isAllDay = this.getFormValue('isAllDay');
        model.dateStartUtc = parseDateToModel(this.getFormValue('dateStart'), this.getFormValue('timeStart'), model.isAllDay);
        model.dateEndUtc = parseDateToModel(this.getFormValue('dateEnd'), this.getFormValue('timeEnd'), model.isAllDay);
        model.calendarId = this.getFormValue('userCalendar')?.value ?? this.getFormValue('userCalendar')?.id;
        if (this.id) {
            model.id = this.id;
        }

        const color: string = this.getFormValue('color');
        model.color = CALENDAR_COLORS.find((item: ISelectItem) => color === item.name)?.value ?? '#0092cc';

        const replay: number = this.getFormValue('replay')?.value;

        if (replay || replay === 0) {
            model.eventRecurrence = {
                interval: replay
            };
        } else {
            model.eventRecurrence = null;
        }
    }

    /**
     * Проверка валидности времени
     * @return boolean
     */
    public isTimeValid(): boolean {
        const timeStart: Dayjs = dayjs(this.getControl('timeStart').getValue(), 'HH:mm');
        const timeEnd: Dayjs = dayjs(this.getControl('timeEnd').getValue(), 'HH:mm');
        const dateStart: Dayjs = dayjs(this.getControl('dateStart').getValue());
        const dateEnd: Dayjs = dayjs(this.getControl('dateEnd').getValue());

        return (timeStart.isBefore(timeEnd) || this.getFormValue('isAllDay'))
            && dateStart.isSameOrBefore(dateEnd);
    }

    /**
     * Получить контролы
     * @protected
     */
    protected getControls(): IControl[] {
        return [
            new TextControlViewModel({
                name: 'name',
                validators: [AbankingValidators.required()],
                options: {
                    placeholder: 'Новое событие',
                },
            }),
            new DatePickerControlViewModel({
                name: 'dateStart',
                defaultValue: this.from,
                options: {
                    placeholder: '',
                },
                validators: [AbankingValidators.required()],
            }),
            new TextControlViewModel({
                name: 'timeStart',
                defaultValue: dayjs(this.from).format('HH:mm'),
                options: {
                    placeholder: 'ЧЧ:MM',
                    abMask: { mask: '99:99' }
                },
                validators: [
                    timeValidator(),
                    AbankingValidators.required()
                ]
            }),
            new TextControlViewModel({
                name: 'timeEnd',
                defaultValue: dayjs(this.to).format('HH:mm'),
                options: {
                    placeholder: 'ЧЧ:MM',
                    abMask: { mask: '99:99' },
                },
                validators: [
                    timeValidator(),
                    AbankingValidators.required()
                ],
            }),
            new DatePickerControlViewModel({
                name: 'dateEnd',
                options: {
                    placeholder: ''
                },
                defaultValue: this.to,
                validators: [AbankingValidators.required()],
            }),
            new SelectControlViewModel({
                name: 'place',
                options: {
                    label: 'Место проведения',
                    isAllowClear: true,
                },
                listItems: this.users
                    .filter((item: UserModel) => item.type === 1)
                    .map((user: UserModel) => ({
                        name: user?.login,
                        value: user?.id,
                    })),
            }),
            new TextAreaControlViewModel({
                name: 'description',
                options: {
                    label: 'Описание'
                }
            }),
            new CheckboxControlViewModel({
                name: 'isAllDay',
                options: {
                    label: 'Весь день'
                }
            }),
            new MultiSelectControlV2ViewModel<ISelectItem<any>>({
                name: 'userIdList',
                options: {
                    label: 'Участники'
                },
                stringify: (value) => value.name
            }),
            new SelectAutocompleteControlV2ViewModel({
                name: 'color',
                defaultValue: CALENDAR_COLORS[0].name,
                validators: [AbankingValidators.required()],
                stringify: (value: string) => value
            }),
            new SelectControlViewModel({
                name: 'userCalendar',
                options: {
                    label: 'Календарь'
                },
                listItems: this.calendars
                    .map((item: CalendarModel) => {
                        return {
                            name: item.name,
                            value: item.id,
                        };
                    }),
                validators: [AbankingValidators.required()]
            }),
            new SelectControlViewModel({
                name: 'replay',
                options: {
                    label: 'Повтор',
                    isAllowClear: true,
                },
                listItems: replayItems
            })
        ];
    }

    /**
     * Прослушка изменений контрола userIdList
     */
    private listenChangesOfUsersList(): void {
        this.getControl('userIdList').valueChanges$
            .pipe(
                tap((items: ISelectItem[]) => {
                    const ids: string[] = items.map((item: ISelectItem) => item.value);

                    this.groupsWithUsers = this.groups
                        .filter((group: IUserGroupResponseModel) => ids.includes(group.id))
                        .map((group: IUserGroupResponseModel) => {
                            return {
                                name: group.name,
                                users: group.userList.map((user: IUserInfoResponseModel) => user.fullName)
                            };
                        });
                }),
                takeUntil(this.onDestroy$)
            )
            .subscribe();

        this.getControl('userCalendar').valueChanges$
            .pipe(
                tap((item: ISelectItem) => {
                    const calendar: CalendarModel | undefined = this.calendars.find((calendarModel: CalendarModel) => item.value === calendarModel.id);
                    if (calendar) {
                        this.getControl('color').setValue(CALENDAR_COLORS.find((color: ISelectItem) => color.value.includes(calendar.color))?.name ?? CALENDAR_COLORS[0].name, true, false);
                    }
                }),
                takeUntil(this.onDestroy$)
            )
            .subscribe();
    }
}
