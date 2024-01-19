import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbOutletTemplateModule, OutletComponentDirectiveModule } from '@abanking/new-modal-core';
import { UiScrollableCommonModule, UiSvgIconCommonModule } from '@abanking/new-modal-ui';
import { SideBarModalWebService } from './side-bar-modal.web.service';
import { SideBarHostWebComponent } from './side-bar-host/side-bar-host.web.component';
import { SideBarModalLayoutWebComponent } from './side-bar-modal-layout/side-bar-modal-layout.web.component';

@NgModule({
    imports: [
        CommonModule,
        UiScrollableCommonModule,
        AbOutletTemplateModule,
        OutletComponentDirectiveModule,
        UiSvgIconCommonModule
    ],
    declarations: [
        SideBarHostWebComponent,
        SideBarModalLayoutWebComponent
    ],
    exports: [
        SideBarHostWebComponent,
        SideBarModalLayoutWebComponent
    ],
})
export class SideBarModalWebModule {
    /**
     * установка сервиса порталов
     * @returns ModuleWithProviders
     */
    public static forRoot(): ModuleWithProviders<SideBarModalWebModule> {
        return {
            ngModule: SideBarModalWebModule,
            providers: [
                SideBarModalWebService
            ]
        };
    }
}
