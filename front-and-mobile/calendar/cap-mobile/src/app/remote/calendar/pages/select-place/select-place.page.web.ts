import { CommonModule, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserModel, UsersInfoCalendarRequestService, UserType } from '../../../../../../../common';
import { ISelectItem } from '@abanking/ui';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AbLetModule } from '@abanking/core';


@Component({
    templateUrl: './select-place.page.web.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['styles/select-place.page.master.web.scss'],
    standalone: true,
    imports: [
        CommonModule,
        NgForOf,
        AbLetModule,
    ],
})
export class SelectPlacePageWeb {
    public places$: Observable<Array<ISelectItem<UserModel>>>;
    private _places$: BehaviorSubject<Array<ISelectItem<UserModel>>> = new BehaviorSubject<Array<ISelectItem<UserModel>>>([]);

    constructor(
        private _usersInfoCalendarRequestService: UsersInfoCalendarRequestService,
        private _router: Router,
    ) {
        this.places$ = this._places$.asObservable();

        this._usersInfoCalendarRequestService.getUsers()
            .pipe(
                tap((users: UserModel[]) => {
                    this._places$.next(users
                        .filter((user: UserModel) => user.type === UserType.meetingRoom)
                        .map((user: UserModel) => ({ name: user.login, value: user }))
                    );
                }),
                take(1)
            )
            .subscribe();
    }

    /**
     * Открыть календарь по айдишнику
     * @param id
     */
    public openCalendar(id: string): void {
        this._router.navigate([`${id}`]);
    }
}
