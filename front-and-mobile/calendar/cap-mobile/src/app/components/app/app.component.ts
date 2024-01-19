import { ChangeDetectionStrategy, Component, ViewContainerRef } from '@angular/core';
import { EnvironmentInjector } from '@angular/core';
import { ModalContainers, ModalService } from '@abanking/ui';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['styles/app.component.scss'],
})
export class AppComponent {
    constructor(
        public readonly environmentInjector: EnvironmentInjector,
        protected modalService: ModalService,
        protected viewContainer: ViewContainerRef,
    ) {
    }

    public ngAfterViewInit(): void {
        this.modalService.initialize(
            this.viewContainer,
            ModalContainers.swipeDialogContainer,
            {
                xLayoutPosition: 'center',
                yLayoutPosition: 'bottom',
                layoutHeight: 'auto',
                layoutWidth: 'auto'
            }
        );
    }

}
