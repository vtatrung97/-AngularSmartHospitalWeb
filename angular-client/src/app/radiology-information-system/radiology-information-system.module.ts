import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';
import { RadiogyInformationSystemRoutingModule } from './radiology-information-system-routing.module';

@NgModule({
    declarations: [
    ],
    imports: [
        AppSharedModule,
        AdminSharedModule,
        CustomizableDashboardModule,
        RadiogyInformationSystemRoutingModule
    ]
})
export class RadiogyInformationSystemModule {
}
