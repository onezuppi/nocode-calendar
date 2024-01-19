import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-budge',
    templateUrl: 'calendar-budge.component.html',
    styleUrls: ['./styles/calendar-budge.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class CalendarBudgeStandaloneComponent {
    /** Активен ли  */
    @Input()
    public readonly isActive: boolean = false;
    /** цвет  */
    @Input()
    public readonly color?: string;
}
