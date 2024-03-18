import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { ServiceRequestSettingRoutingModule } from './serviceRequestSetting-routing.module';
import { ServiceRequestSettingComponent } from './serviceRequestSetting.component';
import { DetailGridComponent } from './detailGrid.component.component';
import { ValueSetSettingComponent } from '../valueSet/valueSetSetting.component';
import { AddIncludeSettingModalComponent } from '../valueSet/AddIncludeSettingModal.component';
import { ElementBindingModalComponent } from '../elementBinding/elementBinding.component';

@NgModule({
    declarations: [ServiceRequestSettingComponent,DetailGridComponent,ValueSetSettingComponent,AddIncludeSettingModalComponent,ElementBindingModalComponent],
    imports: [  AppSharedModule, AdminSharedModule,ServiceRequestSettingRoutingModule ],
    exports: [],
    providers: [],
})
export class ServiceRequestSettingModule {}