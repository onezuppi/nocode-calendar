import { Inject, Injectable, Injector, NgModuleRef, Type } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, switchMap, tap } from 'rxjs';
import {
    ButtonViewModel,
    DialogModalLayoutViewModel,
    IModalComponent,
    ModalContainers,
    ModalEvent,
    ModalLayoutButtonCollectionViewModel,
    ModalLayoutHeaderViewModel,
    ModalService
} from '@abanking/ui';
import {
    CREATE_CALENDAR_COMPONENT_TOKEN,
    CREATE_EVENT_COMPONENT_TOKEN,
    CREATE_GROUP_COMPONENT_TOKEN,
    CreatorBaseService,
    EVENT_INFO_COMPONENT_TOKEN,
    EventLightModel,
    EventModel
} from '../../../../../../submodule';

@Injectable()
export class EventCreatorMobileService extends CreatorBaseService {

    constructor(
        private readonly _modalService: ModalService,
        @Inject(CREATE_EVENT_COMPONENT_TOKEN) private readonly _createEventModal: Type<IModalComponent>,
        @Inject(EVENT_INFO_COMPONENT_TOKEN) private readonly _eventInfoModal: Type<IModalComponent>,
        @Inject(CREATE_CALENDAR_COMPONENT_TOKEN) private readonly _createCalendarModal: Type<IModalComponent>,
        @Inject(CREATE_GROUP_COMPONENT_TOKEN) private readonly _createGroupModal: Type<IModalComponent>,
        @Inject(Injector) private readonly _injector: Injector,
        private readonly _ngModuleRef: NgModuleRef<any>,
    ) {
        super();
    }

    /**
     * Создать событие
     * @returns {Observable<void>}
     */
    public createEvent(event?: EventLightModel, from?: Date, to?: Date): Observable<void> {
        return this._modalService.showModal(
            this.createViewModel(this._createEventModal, 'create-event', { event, from, to },),
            ModalContainers.swipeDialogContainer
        )
            .pipe(
                filter((modalEvent: ModalEvent) => modalEvent === 'isNeedSave'),
                switchMap(() => {
                    return this._modalService.showConfirm({
                        name: 'confirmModal',
                        message: 'Вы уверены, что хотите закрыть окно?',
                        buttonCollection: new ModalLayoutButtonCollectionViewModel(
                            [
                                {
                                    model: new ButtonViewModel({ type: 'primary', content: 'Уверен' }),
                                    actionType: 'submit',
                                },
                                {
                                    model: new ButtonViewModel({ uiType: 'link', content: 'Отмена' }),
                                    actionType: 'cancel',
                                    closeModalOnClick: true,
                                },
                            ],
                        ),
                    });
                }),
                filter((modalEvent: ModalEvent) => modalEvent === 'submit' || modalEvent === 'cancel'),
                tap((modalEvent: ModalEvent) => {
                    if (modalEvent === 'submit') {
                        this._modalService.getModal('confirmModal')?.closeLayout(true);
                        this._modalService.getModal('create-event')?.closeLayout(true);
                    }

                    if (modalEvent === 'cancel') {
                        this._modalService.getModal('confirmModal')?.closeLayout(true);
                    }
                }),
                map(() => void 0),
            );
    }


    /**
     * Модалка информации о ивенте
     * @param eventLight
     */
    public showEvent(eventLight: EventLightModel): Observable<void> {
        const dataChannel$: BehaviorSubject<null | EventModel> = new BehaviorSubject<EventModel | null>(null);

        return this._modalService.showModal(
            this.createViewModel(this._eventInfoModal, 'create-event', { eventLight, dataChannel$ })
        )
            .pipe(
                filter((e: ModalEvent) => e === 'changeToEdit'),
                switchMap(() => this.createEvent(dataChannel$.value!)),
            );
    }

    /** @inheritDoc */
    public createCalendar(isEdit: boolean): Observable<void> {
        return this._modalService.showModal(
            this.createViewModel(this._createCalendarModal, 'create-calendar', { isEdit: isEdit })
        )
            .pipe(
                map(() => void 0),
            );
    }

    /** @inheritDoc */
    public createGroup(isEdit: boolean): Observable<void> {
        return this._modalService.showModal(
            this.createViewModel(this._createGroupModal, 'create-group', { isEdit: isEdit })
        )
            .pipe(
                map(() => void 0),
            );
    }

    /**
     * Создать вью модель для модального окна
     * @param {IModalComponent} component
     * @param {string} name
     * @param {{[p: string]: any}} data
     * @returns {DialogModalLayoutViewModel<IModalComponent>}
     * @private
     */
    protected createViewModel(component: Type<IModalComponent>, name: string, data: { [key: string]: any } = {}): DialogModalLayoutViewModel<IModalComponent> {
        return new DialogModalLayoutViewModel<IModalComponent>(
            component,
            {
                headerModel: new ModalLayoutHeaderViewModel({
                    borderOn: false,
                    hideCloseIcon: false,
                }),
                // options: {
                //     contentFullHeight: true,
                //     layoutHeight: 'full'
                // },
                innerComponentArgs: {
                    ...data,
                    contextInjector: this._injector,
                    ngModuleRef: this._ngModuleRef
                },
                name,
            },
        );
    }
}
