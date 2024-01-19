import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbOutletTemplateModule, OutletComponentDirectiveModule } from '@abanking/new-modal-core';
import { UiScrollableCommonModule } from '@abanking/new-modal-ui';
import { SideBarModalMobileService } from './side-bar-modal.mobile.service';
import { SideBarHostMobileComponent } from './side-bar-host/side-bar-host.mobile.component';
import { SideBarModalLayoutMobileComponent } from './side-bar-modal-layout/side-bar-modal-layout.mobile.component';
import { UiSvgIconCommonModule } from '@abanking/ui';

@NgModule({
    imports: [
        CommonModule,
        UiScrollableCommonModule,
        AbOutletTemplateModule,
        OutletComponentDirectiveModule,
        UiSvgIconCommonModule
    ],
    declarations: [
        SideBarHostMobileComponent,
        SideBarModalLayoutMobileComponent
    ],
    exports: [
        SideBarHostMobileComponent,
        SideBarModalLayoutMobileComponent
    ],
})
export class SideBarModalMobileModule {
    /**
     * установка сервиса порталов
     * @returns ModuleWithProviders
     */
    public static forRoot(): ModuleWithProviders<SideBarModalMobileModule> {
        return {
            ngModule: SideBarModalMobileModule,
            providers: [
                SideBarModalMobileService
            ]
        };
    }
}
