import { IModalComponent } from '@abanking/ui';
import { InjectionToken, Type } from '@angular/core';

export const SHOW_INFO_OF_EVENTS: InjectionToken<Type<IModalComponent>> =
    new InjectionToken('SHOW_INFO_OF_EVENTS');
