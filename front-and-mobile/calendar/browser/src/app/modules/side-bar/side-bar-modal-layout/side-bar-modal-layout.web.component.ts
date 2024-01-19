import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { OUTLET_COMPONENT_PARAMS } from '@abanking/new-modal-core';
import { DialogModalContext } from '@abanking/new-modal-ui';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'ab-side-bar-modal-layout',
    templateUrl: './side-bar-modal-layout.web.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/side-bar-modal-layout.master.web.scss'],
    animations: [
        trigger('sideBarAnimation', [
            transition(':enter', [
                style({
                    transform: 'translateX(100%)'
                }),
                animate('300ms ease-in-out', style({ transform: 'translateX(0%)' }))
            ]),
            transition(':leave', [
                animate('300ms ease-in-out', style({ transform: 'translateX(100%)' }))
            ])
        ])
    ]
})
export class SideBarModalLayoutWebComponent {

    /** на сколько открывается сайд бар */
    @Input()
    public width: number = 80;

    constructor(
        @Inject(OUTLET_COMPONENT_PARAMS) protected outletParams: { context: DialogModalContext<any, any> },
    ) {
    }
}