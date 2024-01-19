import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DataListsV2WebModule, ISelectItem, SelectAutocompleteControlV2ViewModel, SelectAutocompleteControlV2WebModule, } from '@abanking/ui';
import { BehaviorSubject, map, skip, startWith } from 'rxjs';
import { CALENDAR_COLORS } from '../../../../../../submodule';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-calendar-color-picker',
    templateUrl: 'color-picker.mobile.component.html',
    styleUrls: ['styles/color-picker.mobile.master.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        DataListsV2WebModule,
        SelectAutocompleteControlV2WebModule,
    ],
})
export class ColorPickerMobileComponent {
    @Input()
    public model?: SelectAutocompleteControlV2ViewModel;

    @Input()
    public form?: SelectAutocompleteControlV2ViewModel;

    protected readonly colors$: any = new BehaviorSubject<any>(CALENDAR_COLORS)
        .pipe(
            skip(1),
            startWith(''),
            map((trim: string) => {
                return CALENDAR_COLORS.filter((item: ISelectItem<any>) => item.name.toLowerCase().includes(trim.toLowerCase())) || [];
            })
        );
}
