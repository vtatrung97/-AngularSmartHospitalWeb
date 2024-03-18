import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';
import { MedicalViewerRoutingModule } from './medicalviewer-routing.module';
import { MedicalViewerComponent } from './medicalviewer.component';

@NgModule({
    declarations: [
        MedicalViewerComponent
    ],
    imports: [
        AppSharedModule,
        AdminSharedModule,
        CustomizableDashboardModule,
        MedicalViewerRoutingModule
    ]
})
export class MedicalViewerModule {
}
