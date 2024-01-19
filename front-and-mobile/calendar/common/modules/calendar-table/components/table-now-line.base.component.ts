import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { DestroyService } from '@abanking/core';
import { fromEvent, map, takeUntil, tap, timer } from 'rxjs';
import dayjs from 'dayjs';
import { CalendarTableBaseDirective } from '../directives';

@Directive()
export class TableNowLineBaseComponent implements OnInit {
    /**
     * Позиция линии
     * @returns {number}
     */
    @HostBinding('style.top.%')
    public get top(): number {
        const [h, m]: [number, number] = this._now;

        return (h + m / 60) / 24 * 100;
    }

    /**
     * Смещение линии
     * @returns {number}
     */
    public get left(): number {
        return this.hostWidth - this.width;
    }

    /**
     * Ширина линии
     * @returns {number}
     */
    public get width(): number {
        const day: number = dayjs().day() || 7;
        const percent: number = this.dayCount === 1 ? 1 : (1 - ((day - 1) / this.dayCount));

        return (this.hostWidth - this.tableData.titleColumnWidth) * percent;
    }

    /**
     * Ширина хоста
     * @returns {number}
     * @private
     */
    protected get hostWidth(): number {
        const rect: DOMRect = this.elementRef.nativeElement.getBoundingClientRect();

        return rect.width;
    }

    /** [hours, minutes] */
    public get now(): [number, number] {
        return this._now;
    }

    /**
     * Количество дней
     * @type {number}
     */
    @Input()
    public readonly dayCount: number = 1;
    /** [hours, minutes] */
    private _now: [number, number] = [new Date().getHours(), new Date().getMinutes()];

    constructor(
        protected readonly elementRef: ElementRef<HTMLElement>,
        protected readonly cdr: ChangeDetectorRef,
        protected readonly destroy$: DestroyService,
        protected readonly tableData: CalendarTableBaseDirective
    ) {
    }

    /**
     * Обновление раз в минуту
     */
    public ngOnInit(): void {
        timer(0, 1000 * 60)
            .pipe(
                map(() => new Date()),
                tap((now) => this._now = [now.getHours(), now.getMinutes()]),
                takeUntil(this.destroy$)
            ).subscribe(() => this.cdr.detectChanges());
        fromEvent(window, 'resize')
            .pipe(
                takeUntil(this.destroy$)
            ).subscribe(() => this.cdr.detectChanges());
    }
}
