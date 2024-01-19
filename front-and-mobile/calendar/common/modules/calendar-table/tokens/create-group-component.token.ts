import { IModalComponent } from '@abanking/ui';
import { InjectionToken, Type } from '@angular/core';

export const CREATE_GROUP_COMPONENT_TOKEN: InjectionToken<Type<IModalComponent>> =
    new InjectionToken('CREATE_GROUP_COMPONENT_TOKEN');
