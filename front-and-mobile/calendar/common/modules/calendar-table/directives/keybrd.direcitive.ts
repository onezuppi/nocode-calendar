import { Directive, HostListener } from '@angular/core';
import { CalendarPaginationService } from '../services';
import { ModalService } from '@abanking/ui';

@Directive({
    selector: '[keybrd]'
})
export class KeybrdDirecitive {
    constructor(
        private readonly _pgS: CalendarPaginationService,
        private readonly _modalService: ModalService
    ) {
    }

    /**
     * Слушатель нажатия клавиш
     * @param {KeyboardEvent} e
     * @returns void
     */
    @HostListener('window:keydown', ['$event'])
    public step(e: KeyboardEvent): void {
        if (this._modalService.getLastModal()) {
            return;
        }
        switch (e.key) {
            case 'ArrowLeft':
                return this._pgS.step(-1);
            case 'ArrowRight':
                return this._pgS.step(1);
        }
    }
}
