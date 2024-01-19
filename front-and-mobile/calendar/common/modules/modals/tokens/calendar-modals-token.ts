import { IModalComponent } from '@abanking/ui';
import { InjectionToken, Type } from '@angular/core';

export const CALENDAR_TOAST_MODAL: InjectionToken<Type<IModalComponent>> = new InjectionToken<Type<IModalComponent>>('модальное окно тоста');

export const CALENDAR_MESSAGE_MODAL: InjectionToken<Type<IModalComponent>> = new InjectionToken<Type<IModalComponent>>('модальное окно тоста');
