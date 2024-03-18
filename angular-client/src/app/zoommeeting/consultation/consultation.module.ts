import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';
import { ConsultationRoutingModule } from './consultation-routing.module';

import { ConsultationComponent } from './consultation.component';

@NgModule({
    declarations: [ConsultationComponent],
    imports: [ 
        AppSharedModule,
        AdminSharedModule,
        CustomizableDashboardModule,
        ConsultationRoutingModule,
    ],
    exports: [],
    providers: [],
})
export class ConsultationModule {}