import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SideBarModalMobileService } from '../side-bar-modal.mobile.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'ab-side-bar-host',
    templateUrl: './side-bar-host.mobile.component.html',
    styleUrls: ['./styles/side-bar-modal-host.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('sideBarAnimation', [
            transition(':leave', [
                animate('300ms ease-in-out', style({ transform: 'translateY(100%)' }))
            ])
        ])
    ]
})
export class SideBarHostMobileComponent {

    constructor(
        protected sideBarModalWebService: SideBarModalMobileService
    ) {
    }

    /**
     * Закрыть последнюю сайд бар модалку
     * @protected
     */
    protected closeLast(): void {
        this.sideBarModalWebService.closeLast();
    }
}
