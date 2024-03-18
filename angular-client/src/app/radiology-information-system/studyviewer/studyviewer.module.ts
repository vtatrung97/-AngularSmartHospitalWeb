import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';
import { StudyViewerRoutingModule } from './studyviewer-routing.module';
import { StudyViewerComponent } from './studyviewer.component'

@NgModule({
    declarations: [
        StudyViewerComponent
    ],
    imports: [
        AppSharedModule,
        AdminSharedModule,
        CustomizableDashboardModule,
        StudyViewerRoutingModule
    ],
    exports: [
    ]
})
export class StudyViewerModule {
}
