import { Directive, ElementRef, HostListener, Inject, inject, Injector, NgModuleRef, Type } from '@angular/core';
import { OUTLET_COMPONENT_PARAMS } from '@abanking/core';
import { DestroyService } from '@abanking/core';
import { EVENT_ID_KEY } from '../constants';
import { gtb, TbFn } from '../utils';
import { CalendarTableBaseDirective } from '../directives';
import { takeUntil } from 'rxjs';
import { IModalComponent, ModalService } from '@abanking/ui';
import { IS_READONLY_TOKEN, SHOW_INFO_OF_EVENTS } from '../tokens';
import dayjs from 'dayjs';
import { CreatorBaseService } from '../services';
import { ITableLightEvent } from '../interfaces';

@Directive()
export abstract class EventContainerBaseComponent<T> {
    /** Track By */
    public readonly tb: TbFn<ITableLightEvent> = gtb('id');
    public readonly data: T = inject<T>(OUTLET_COMPONENT_PARAMS);

    constructor(
        protected readonly destroy$: DestroyService,
        protected readonly elementRef: ElementRef,
        protected readonly tableData: CalendarTableBaseDirective,
        protected readonly eventCreatorManager: CreatorBaseService,
        protected readonly modalService: ModalService,
        @Inject(IS_READONLY_TOKEN) public readonly isReadonly: boolean,
        @Inject(Injector) protected injector: Injector,
        protected ngModuleRef: NgModuleRef<any>,
    ) {
    }

    protected abstract getEventById(id?: string | null): ITableLightEvent | null;

    /**
     * Прослушка события клик
     */
    @HostListener('click', ['$event'])
    public openGenerateEventModal(event: PointerEvent): void {
        const target: HTMLElement = event.target as HTMLElement;
        if (this.elementRef.nativeElement === target && !this.isReadonly) {
            return this.create(event);
        }

        const tableEvent: ITableLightEvent | null = this.eventToEvent(event);
        tableEvent && this.showExisting(tableEvent);
    }

    /**
     * Создать ивент
     * @param {PointerEvent} event - событие клик
     * @private
     */
    protected create(event: PointerEvent): void {
        const date: Date = this.clickToTime(event);

        this.eventCreatorManager.createEvent(
            undefined, date, dayjs(date).add(1, 'hour').toDate(),
        )
            .pipe(
                takeUntil(this.destroy$),
            ).subscribe();
    }

    /**
     * Показать существующий ивент
     * @param {ITableLightEvent} tableEvent - ивент
     * @private
     */
    protected showExisting(tableEvent: ITableLightEvent): void {
        this.eventCreatorManager.showEvent(tableEvent)
            .pipe(
                takeUntil(this.destroy$),
            ).subscribe();
    }

    /**
     * Перевод клика во время суток
     * @param {PointerEvent} event - событие клик
     * @returns {Date} - время ивента
     */
    protected clickToTime(event: PointerEvent): Date {
        return new Date();
    }

    /**
     * Получение ивента по клику
     * @param event PointerEvent
     * @returns ITableEvent | null
     */
    protected eventToEvent(event: PointerEvent): ITableLightEvent | null {
        let target: HTMLElement | null = event.target as HTMLElement;
        while (target && !target.dataset[EVENT_ID_KEY]) {
            target = target.parentElement;
        }

        if (!target) {
            return null;
        }

        return this.getEventById(target.dataset[EVENT_ID_KEY]);
    }
}
