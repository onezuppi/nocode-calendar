import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { HttpMobile } from '@abanking/core-mobile';

if (environment.production) {
    enableProdMode();
}
HttpMobile.setOptions(environment.httpMobile);

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
