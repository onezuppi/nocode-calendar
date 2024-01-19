import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SideBarModalWebService } from '../side-bar-modal.web.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'ab-side-bar-host',
    templateUrl: './side-bar-host.web.component.html',
    styleUrls: ['./styles/side-bar-modal-host.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('sideBarAnimation', [
            transition(':leave', [
                animate('300ms ease-in-out', style({ transform: 'translateX(100%)' }))
            ])
        ])
    ]
})
export class SideBarHostWebComponent {

    constructor(
        protected sideBarModalWebService: SideBarModalWebService
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