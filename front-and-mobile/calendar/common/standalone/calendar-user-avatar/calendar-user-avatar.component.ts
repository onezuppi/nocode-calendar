import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CalendarBudgeStandaloneComponent } from '../calendar-budge/calendar-budge.component';
import { UiHintCommonModule } from '@abanking/ui';
import { CALENDAR_COLORS } from '../../modules';

@Component({
    selector: 'app-calendar-user-avatar',
    templateUrl: 'calendar-user-avatar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CalendarBudgeStandaloneComponent,
        UiHintCommonModule
    ]
})
export class CalendarUserAvatarStandaloneComponent {
    /**
     * цвет
     * @returns {string}
     */
    public get color(): string {
        return CALENDAR_COLORS[Math.floor(Math.random() * CALENDAR_COLORS.length)].value;
    }

    /** инициалы */
    public get initials(): string {
        const [first, second, ...other]: string[] = this.name.split(' ');

        return `${first[0]}${second[0]}`;
    }

    /** имя  */
    @Input()
    public readonly name!: string;
}
