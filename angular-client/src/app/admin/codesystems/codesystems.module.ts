import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { CodeSystemsRoutingModule } from './codesystems-routing.module';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';
import { CodeSystemsComponent } from './codesystems.component';
import { CreateOrEditCodeSystemModalComponent } from './create-or-edit-codesystem-modal.component';
import { DxListModule } from 'devextreme-angular';

@NgModule({
    declarations: [
        CodeSystemsComponent,CreateOrEditCodeSystemModalComponent
    ],
    imports: [
        AppSharedModule, 
        AdminSharedModule, 
        CodeSystemsRoutingModule,

        DxListModule
    ],
    exports: []
})
export class CodeSystemsModule {
}
