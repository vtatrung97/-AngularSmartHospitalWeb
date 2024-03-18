import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';
import { StructureDefinitionComponent } from './structure-definition.component';
import { StructureDefinitionRoutingModule } from './structure-definition-routing.module'
import { CreateStructureDefinitionModalComponent } from './createStructureDefinitionModal.component';
import { StructureDefinitionDetailComponent } from './detail/structureDefinitionDetail.component';
import { ElementBindingModalComponent } from './detail/elementBindingModal.component';
import { ElementCodeModalComponent } from './detail/elementCodeModal.component';
import { EditStructureDefinitionModalComponent } from './editStructureDefinitionModal.component';

@NgModule({
    declarations: [
        StructureDefinitionComponent,
        CreateStructureDefinitionModalComponent,
        EditStructureDefinitionModalComponent,
        StructureDefinitionDetailComponent,
        ElementBindingModalComponent,
        ElementCodeModalComponent
    ],
    imports: [
        AppSharedModule,
        AdminSharedModule,
        CustomizableDashboardModule,
        StructureDefinitionRoutingModule
    ],
    exports: [
    ]
})
export class StructureDefinitionModule {
}
