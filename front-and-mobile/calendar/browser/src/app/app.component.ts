import { ModalContainers, ModalService } from '@abanking/ui';
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'service-front-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
    constructor(
        protected modalService: ModalService,
        protected viewContainer: ViewContainerRef,) {
    }

    public ngAfterViewInit(): void {
        this.modalService.initialize(
            this.viewContainer,
            ModalContainers.dialogContainer,
            {
                xLayoutPosition: 'center',
                yLayoutPosition: 'center',
                layoutHeight: 'auto',
                layoutWidth: 'auto'
            }
        );
    }
}
