import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';
import { ZoomMeetingRoutingModule } from './zoommeeting-routing.module';

import { DxDataGridModule, DxTemplateModule } from 'devextreme-angular';

@NgModule({
    declarations: [],
    imports: [ 
        AppSharedModule,
        AdminSharedModule,
        CustomizableDashboardModule,
        ZoomMeetingRoutingModule,
        
        DxDataGridModule,
        DxTemplateModule
    
    ],
    exports: [],
    providers: [],
})
export class ZoomMeetingModule {}