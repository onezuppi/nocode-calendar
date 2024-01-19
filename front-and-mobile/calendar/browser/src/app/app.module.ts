import { AbBaseAnonymusRequestCommonModule } from '@abanking/core';
import { BaseCacheCommonModule } from '@abanking/core';
import { AbHttpRequestCommonModule } from '@abanking/core';
import { TranslateModule } from '@abanking/core';
import { AbModalWebModule } from '@abanking/ui';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BaseStorageBrowserModule } from '@abanking/core';
import { DestroyService } from '@abanking/core';
import { AbBaseStorageCommonModule } from '@abanking/core';
import { AbBaseIdentityRequestCommonModule } from '@abanking/core';
import calendar from './remote/calendar/remote';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './remote/calendar/services/auth.interceptor';
import { ModalsWebModule } from './modules/modals/modals.web.module';
import { CalendarInfoRequestService, UsersInfoCalendarRequestService, SnowWebComponent } from '../submodule';
import {
    LayoutCalendarReadonlyPageWeb
} from './remote/calendar/pages/layout-calendar-readonly/layout-calendar-readonly.page.web';
import { LayoutCalendarPageWeb } from './remote/calendar/pages/layout-calendar/layout-calendar.page.web';
import { CommonModule } from '@angular/common';
import { SideBarModalWebModule } from './modules/side-bar/side-bar-modal.web.module';
import { AbPortalModule } from '@abanking/new-modal-ui';
import { SelectPlacePageWeb } from './remote/calendar/pages/select-place/select-place.page.web';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AbModalWebModule.forRoot(),
        TranslateModule.forRoot(),
        BaseCacheCommonModule.forRoot(),
        AbHttpRequestCommonModule.forRoot(),
        AbBaseAnonymusRequestCommonModule.forRoot(),
        AbBaseIdentityRequestCommonModule.forRoot(),
        AbBaseStorageCommonModule.forRoot(),
        BaseStorageBrowserModule.forRoot(),
        BaseCacheCommonModule.forRoot(),
        //        AbankingWidgetModule.forRoot([
        //            registerContent({ type: 'calendar', content: cabinetSettings }),
        //            registerContent({ type: 'calendar', content: calendar }),
        //        ]),
        //        AbankingWidgetDemoCommonModule.demo({
        //            cabinetSettings: settingsSchema,
        //            calendar: calendarScheme,
        //        }),
        RouterModule.forRoot([
            {
                path: 'select-place',
                component: SelectPlacePageWeb,
                pathMatch: 'full'
            },
            {
                path: '',
                component: LayoutCalendarPageWeb,
                pathMatch: 'full'
            },
            {
                path: ':id',
                component: LayoutCalendarReadonlyPageWeb,
                pathMatch: 'full'
            },
        ]),
        ModalsWebModule.forRoot(),
        SideBarModalWebModule.forRoot(),
        AbPortalModule.forRoot(),
        SnowWebComponent
    ],
    providers: [
        DestroyService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        UsersInfoCalendarRequestService,
        CalendarInfoRequestService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
