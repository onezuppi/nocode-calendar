import { Directive } from '@angular/core';
import { BehaviorSubject, finalize, Observable, takeUntil } from 'rxjs';
import { DestroyService } from '@abanking/core';

@Directive({
    selector: '[ldng]',
    exportAs: 'ldng',
    standalone: true,
    providers: [
        DestroyService
    ]
})
export class LoadingDirective extends BehaviorSubject<boolean> {
    constructor(private readonly _destroy$: DestroyService) {
        super(false);
    }

    /**
     * Наблюдение за  Observable
     * @param observable$
     */
    public watch<T>(observable$: Observable<T>): void {
        if (this.value){
            return;
        }
        this.next(true);
        observable$
            .pipe(
                finalize(() => this.next(false)),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }
}
