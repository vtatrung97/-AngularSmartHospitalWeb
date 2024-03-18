import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListComponent } from './list/patientlist.component';
import { PatientRoutingModule } from './patient-routing.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';
import { CreateOrUpdatePatientModalComponent } from './createorupdate/createOrUpdatePatientModal.component';

import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { DxButtonModule } from 'devextreme-angular';

import { DxTabsModule, DxSelectBoxModule } from 'devextreme-angular';
import { DxDataGridModule, DxTemplateModule } from 'devextreme-angular';

@NgModule({
  declarations: [PatientListComponent,CreateOrUpdatePatientModalComponent],
  imports: [PatientRoutingModule, AppSharedModule, AdminSharedModule, CustomizableDashboardModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,

    MessagesModule,
    MessageModule,
  
    DxButtonModule,
    DxTabsModule,
    DxSelectBoxModule,
    
    DxDataGridModule,
    DxTemplateModule
  ],
})
export class PatientModule {}
