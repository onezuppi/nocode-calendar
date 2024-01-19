import { InjectionToken } from '@angular/core';

export const IS_READONLY_TOKEN: InjectionToken<Boolean> =
    new InjectionToken('IS_READONLY_TOKEN', {
        factory: () => false
    });
