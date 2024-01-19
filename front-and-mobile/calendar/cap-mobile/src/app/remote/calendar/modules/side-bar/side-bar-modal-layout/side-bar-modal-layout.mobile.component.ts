import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { OUTLET_COMPONENT_PARAMS } from '@abanking/new-modal-core';
import { DialogModalContext } from '@abanking/new-modal-ui';
import { animate, style, transition, trigger } from '@angular/animations';
import { getSoftHeightAnimation } from "@abanking/core";

@Component({
    selector: 'ab-side-bar-modal-layout',
    templateUrl: './side-bar-modal-layout.mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/side-bar-modal-layout.master.mobile.scss'],
    animations: [
        getSoftHeightAnimation()
    ]
})
export class SideBarModalLayoutMobileComponent {

    /** на сколько открывается сайд бар */
    @Input()
    public width: number = 80;

    constructor(
        @Inject(OUTLET_COMPONENT_PARAMS) protected outletParams: { context: DialogModalContext<any, any> },
    ) {
    }
}
