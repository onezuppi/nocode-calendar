import { ChangeDetectionStrategy, Component, Inject, Injector, Input, NgModuleRef, Type } from '@angular/core';
import { DestroyService } from '@abanking/core';
import { ITableLightEvent, SHOW_INFO_OF_EVENTS } from '../../../../../../../submodule';
import { DialogModalLayoutViewModel, IModalComponent, ModalLayoutHeaderViewModel, ModalService } from '@abanking/ui';
import { take, takeUntil } from 'rxjs';


@Component({
    selector: 'app-show-event-list-btn',
    templateUrl: 'show-event-list-btn.component.mobile.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService,
    ],
})
export class ShowEventListBtnComponentMobile {
    @Input()
    public readonly events: ITableLightEvent[] = [];

    constructor(
        private readonly _modalService: ModalService,
        private readonly _destroy$: DestroyService,
        @Inject(Injector) private readonly _injector: Injector,
        private readonly _ngModuleRef: NgModuleRef<any>,
        @Inject(SHOW_INFO_OF_EVENTS) private readonly _showEvents: Type<IModalComponent>,
    ) {
    }


    /**
     * Открыть модальное окно со всеми ивентами
     */
    public openModal(): void {
        const modal: DialogModalLayoutViewModel<IModalComponent> =
            new DialogModalLayoutViewModel<IModalComponent>(
                this._showEvents,
                {
                    name: 'allEventsOnDay',
                    innerComponentArgs: {
                        events: this.events,
                        contextInjector: this._injector,
                        ngModuleRef: this._ngModuleRef,
                    },
                    headerModel: new ModalLayoutHeaderViewModel({
                        borderOn: false,
                    }),
                    options: {
                        hiddenOverlay: false,
                        layoutWidth: 'l',
                    },
                }
            );

        this._modalService.showModal(modal)
            .pipe(
                take(1),
                takeUntil(this._destroy$),
            )
            .subscribe();
    }
}
