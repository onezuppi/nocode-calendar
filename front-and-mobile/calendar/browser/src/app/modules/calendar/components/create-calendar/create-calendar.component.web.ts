import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IModalArgsContainer, IModalComponent } from '@abanking/ui';
import {
    CALENDAR_COLORS,
    CalendarCreateViewModel,
    CalendarInfoRequestService,
    CalendarManagerBaseService, CalendarModel,
    ICalendarInfo,
    UserCalendarsService,
} from '../../../../../submodule';
import { DestroyService } from '@abanking/core';
import { BehaviorSubject, catchError, EMPTY, Observable, take, tap } from 'rxjs';
import { ISelectItem } from '@abanking/ui';

@Component({
    templateUrl: 'create-calendar.component.web.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/create-calendar.master.web.scss'],
    providers: [
        DestroyService,
    ]
})
export class CreateCalendarComponentWeb extends IModalComponent {
    public readonly colors: Array<ISelectItem<string>> = CALENDAR_COLORS;
    public calendarCreateViewModel: CalendarCreateViewModel = new CalendarCreateViewModel([]);
    public isEdit: boolean = false;
    public isLoad: Observable<boolean>;
    private _isLoad: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private _modalArgs: IModalArgsContainer,
        private _calendarManagerService: CalendarManagerBaseService,
        public readonly calendarInfoRequestService: CalendarInfoRequestService,
        public readonly userCalendarsService: UserCalendarsService,
    ) {
        super();
        this.isLoad = this._isLoad.asObservable();

        if (this._modalArgs.dict.isEdit) {
            this.isEdit = this._modalArgs.dict.isEdit;
        }

        if (this.isEdit) {
            this.calendarInfoRequestService.getAllCalendars()
                .pipe(
                    tap((calendars: CalendarModel[]) => {
                        this.calendarCreateViewModel = new CalendarCreateViewModel(calendars);
                        this._isLoad.next(true);
                    }),
                    catchError(() => {
                        this.calendarCreateViewModel = new CalendarCreateViewModel([]);
                        this._isLoad.next(true);

                        return EMPTY;
                    }),
                    take(1)
                )
                .subscribe();
        } else {
            this.calendarCreateViewModel = new CalendarCreateViewModel([]);
            this._isLoad.next(true);
        }
    }

    /**
     * Создание ивента
     */
    public create(): void {
        if (!this.calendarCreateViewModel.valid) {
            console.log('Некорректные данные');

            return;
        }

        (this.isEdit
            ? this._calendarManagerService.edit(this.calendarCreateViewModel.toModel())
            : this._calendarManagerService.add(this.calendarCreateViewModel.toModel())
        ).pipe(
            take(1)
        ).subscribe(() => {
            this.userCalendarsService.loadCalendars();
        });
        this.model.closeLayout(true);
    }

    /**
     * Закрыть модальное окно
     */
    public close(): void {
        const model: ICalendarInfo = this.calendarCreateViewModel.toModel();

        if (this.isEdit) {
            this._calendarManagerService.delete(model.id!)
                .pipe(take(1)).subscribe();
        }

        if (this.isEdit) {
            this.model.emitEvent('isNeedSave');
        } else {
            this.model.closeLayout(true);
        }
    }
}
