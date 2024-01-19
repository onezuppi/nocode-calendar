import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IModalArgsContainer, IModalComponent } from '@abanking/ui';
import { EventFormManagerService, EventManagerBaseService, EventViewModel, ITableLightEvent, } from '../../../../../../../submodule';
import { DestroyService } from '@abanking/core';
import { Observable, take, takeUntil, tap, BehaviorSubject, finalize } from 'rxjs';

@Component({
    templateUrl: 'create-event.component.mobile.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/create-event.master.mobile.scss'],
    providers: [
        DestroyService,
    ]
})
export class CreateEventComponentMobile extends IModalComponent {
    /** Редактирование ивента */
    public readonly isEdit: boolean = this._modalArgs.dict.event || false;
    /** Дата ивента */
    public readonly from?: Date = this._modalArgs.dict.from;
    /** Дата ивента */
    public readonly to?: Date = this._modalArgs.dict.to;
    /** Модель представления */
    public readonly eventModel$: Observable<EventViewModel> =
        this._formManagerService.initViewModel(this._destroy$, this.from, this.to)
            .pipe(
                tap((model: EventViewModel) => this.isEdit && model.fromModel(this._modalArgs.dict.event)),
                tap((model: EventViewModel) => this.checkIsChanged(model)),
            );

    protected isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _isChanged: boolean = false;


    constructor(
        private _modalArgs: IModalArgsContainer,
        private _eventManagerService: EventManagerBaseService,
        private _formManagerService: EventFormManagerService,
        private _destroy$: DestroyService
    ) {
        super();
    }

    /**
     * Создание ивента
     */
    public createEvent(event: EventViewModel): void {
        if (!event.valid || !event.isTimeValid()) {
            event.markAsTouched(true);

            return;
        }
        this.isLoading$.next(true);
        this._eventManagerService[this.isEdit ? 'edit' : 'add'](event.toModel())
            .pipe(
                take(1),
                finalize(() => {
                    this.isLoading$.next(false);
                })
            )
            .subscribe(() => {
                this.model.closeLayout(true);
            });
    }

    /**
     * Закрыть модальное окно
     */
    public close(event?: EventViewModel): void {
        if (this.isEdit && event) {
            this.isLoading$.next(true);
            this._eventManagerService.delete(this._modalArgs.dict.event.id)
                .pipe(
                    take(1),
                    finalize(() => {
                        this.isLoading$.next(false);
                    })
                )
                .subscribe(() => {
                    this.model.closeLayout(true);
                });
        }

        if (this._isChanged) {
            this.model.emitEvent('isNeedSave');
        } else {
            this.model.closeLayout(true);
        }
    }

    /**
     * Проверка на изменения
     * @param {EventViewModel} model
     * @private
     */
    private checkIsChanged(model: EventViewModel): void {
        const defaultModel: string = JSON.stringify(model.toModel());
        model.formValueChanges()
            .pipe(
                takeUntil(this._destroy$)
            )
            .subscribe(() => {
                const currentModel: ITableLightEvent = model.toModel();
                this._isChanged = JSON.stringify(currentModel) !== defaultModel;
            });
    }
}
