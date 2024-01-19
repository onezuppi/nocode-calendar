import { inject, InjectionToken } from '@angular/core';
import { Platform } from '@ionic/angular';

export const API_URL_TOKEN: InjectionToken<string> = new InjectionToken<string>('Токенн ссылки', {
    factory: () => {
        const platform: Platform = inject(Platform);

        if (platform.is('capacitor')){
            return 'https://provider.calendar-stable.k8s.corp.artsofte.ru/calendar-api/'
        }

        return '/calendar-api/'
    }
});
