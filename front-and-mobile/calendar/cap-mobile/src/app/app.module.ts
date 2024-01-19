import { APP_INITIALIZER, inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    AbBaseAnonymusRequestCommonModule,
    AbBaseIdentityRequestCommonModule,
    AbBaseStorageCommonModule,
    AbHttpRequestCommonModule,
    BaseCacheCommonModule,
    BaseFileManagerBrowserModule,
    DestroyService,
    GlobalEventHandlingModule,
    TranslateModule,
} from '@abanking/core';
import { AbModalMobileModule } from '@abanking/ui-mobile';
import { AbBaseStorageMobileModule, AbHttpRequestMobileModule, AbSslPinningService } from '@abanking/core-mobile';
import { UiSvgIconCommonModule } from '@abanking/ui';
import { AbPortalModule } from '@abanking/new-modal-ui';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './remote/calendar/services/auth.interceptor';
import { SideBarModalMobileModule } from './remote/calendar/modules/side-bar/side-bar-modal.mobile.module';
import { ModalsMobileModule } from './remote/calendar/modules/modals/modals.mobile.module';
import { CalendarInfoRequestService, UsersInfoCalendarRequestService } from '../submodule';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        UiSvgIconCommonModule,
        BrowserAnimationsModule,
        BaseFileManagerBrowserModule.forRoot(),
        AbHttpRequestCommonModule.forRoot(),
        TranslateModule.forRoot(),
        AbModalMobileModule.forRoot(),
        AbHttpRequestMobileModule.forRoot(),
        AbBaseStorageCommonModule.forRoot(),
        AbBaseStorageMobileModule.forRoot(),
        AbBaseAnonymusRequestCommonModule.forRoot(),
        GlobalEventHandlingModule.forRoot(),
        BaseCacheCommonModule.forRoot(),
        AbPortalModule.forRoot(),
        SideBarModalMobileModule.forRoot(),
        AbBaseIdentityRequestCommonModule.forRoot(),
        ModalsMobileModule.forRoot()
        // UiDialogsCommonModule.forRoot(),
        // AbUiSwipeModalModule.forRoot()
    ],
    providers: [
        HttpClient,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        DestroyService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        UsersInfoCalendarRequestService,
        CalendarInfoRequestService,
        {
            provide: APP_INITIALIZER,
            useFactory: () => {
                const sslService: AbSslPinningService = inject(AbSslPinningService);

                return (): void => {
                    sslService.initSslPinning();
                }
            },
            multi: true
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
