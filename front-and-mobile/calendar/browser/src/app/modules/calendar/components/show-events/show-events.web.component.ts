import { IModalArgsContainer, IModalComponent } from '@abanking/ui';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreatorBaseService, ITableEvent } from '../../../../../submodule';
import { take } from 'rxjs';

@Component({
    templateUrl: 'show-events.web.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['styles/show-events.web.master.component.scss'],
})
export class ShowEventsWebComponent extends IModalComponent {
    public events: ITableEvent[] = [];

    constructor(
        private _modalArgsContainer: IModalArgsContainer,
        private _eventCreatorTmpService: CreatorBaseService
    ) {
        super();

        this.events = this._modalArgsContainer.dict.events;
    }

    /**
     * Показать информацию о событии
     * @param event
     */
    public showInfo(event: ITableEvent): void {
        this.model.closeLayout(true);
        this._eventCreatorTmpService.showEvent(event).pipe(take(1)).subscribe();
    }
}
