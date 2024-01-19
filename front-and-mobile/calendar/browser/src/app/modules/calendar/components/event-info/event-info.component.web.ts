import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { IModalArgsContainer, IModalComponent } from '@abanking/ui';
import { DestroyService, memoize } from '@abanking/core';
import { BehaviorSubject, forkJoin, map, Observable, take, tap } from 'rxjs';
import { CalendarInfoRequestService, EventInfoViewModel, EventLightModel, EventManagerBaseService, EventModel, IS_READONLY_TOKEN, UsersInfoCalendarRequestService, } from '../../../../../submodule';


@Component({
    templateUrl: 'event-info.component.web.html',
    styleUrls: ['./styles/event-info.master.web.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService,
    ],
})
export class EventInfoComponentWeb extends IModalComponent {
    /**
     * Информация о ивенте
     * @returns {Observable<EventInfoViewModel>}
     */
    @memoize()
    public get event$(): Observable<EventInfoViewModel> {
        return forkJoin({
            user: this._userInfoService.getCurrentUserWithCache(),
            users: this._userInfoService.getUsersWithCache(),
            event: this._eventManagerService.getById(this.eventLight.id),
            calendars: this._calendarInfoService.getAllCalendars()
        }).pipe(
            map(data => new EventInfoViewModel(data)),
        );
    }

    public readonly eventLight: EventLightModel = this._modalArgs.dict.eventLight;
    private readonly _dataChannel$: BehaviorSubject<null | EventModel> = this._modalArgs.dict.dataChannel$;


    constructor(
        private readonly _modalArgs: IModalArgsContainer,
        private readonly _userInfoService: UsersInfoCalendarRequestService,
        private readonly _eventManagerService: EventManagerBaseService,
        private readonly _calendarInfoService: CalendarInfoRequestService,
        @Inject(IS_READONLY_TOKEN) public readonly isReadonly: boolean,
    ) {
        super();
    }

    /**
     * Создание ивента
     * @param {EventModel} event
     */
    public editEvent(event: EventModel): void {
        this._dataChannel$.next(event);
        this.model.emitEvent('changeToEdit');
        this.model.closeLayout();
    }

    /**
     * Удаление ивента
     */
    public deleteEvent(): void {
        this._eventManagerService.delete(this.eventLight.id)
            .pipe(
                tap(() => this.model.closeLayout(true)),
                take(1),
            )
            .subscribe();
    }

    /**
     * Закрыть модальное окно
     */
    public close(): void {
        this.model.closeLayout(true);
    }
}
