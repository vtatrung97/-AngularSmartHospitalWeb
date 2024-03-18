import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';
import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingComponent } from './meeting.component';


@NgModule({
    declarations: [MeetingComponent],
    imports: [  
        AppSharedModule,
        AdminSharedModule,
        CustomizableDashboardModule,
        MeetingRoutingModule

    ],
    exports: [],
    providers: [],
})
export class MeetingModule {}