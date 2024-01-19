import { ModalEvent } from '@abanking/ui';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IMessageParams, IToastParams } from '../interfaces';


@Injectable()
export abstract class ModalManagerBaseService {

    /**
     * Показать уведомление-тостер
     * @param params опции
     * @param params IToastParams
     */
    public abstract showToast(params: IToastParams): Observable<ModalEvent>

    /**
     * Показать сообщение в виде модального окна
     * @param params
     * @returns Observable<ModalEvent>
     */
    public abstract showMessage(params: IMessageParams): Observable<ModalEvent>

}
