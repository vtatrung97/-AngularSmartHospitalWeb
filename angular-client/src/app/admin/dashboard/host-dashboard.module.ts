import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { HostDashboardRoutingModule } from './host-dashboard-routing.module';

import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';


import { DxButtonModule } from 'devextreme-angular';
import { DxTabsModule, DxSelectBoxModule } from 'devextreme-angular';
import { DxDataGridModule, DxTemplateModule } from 'devextreme-angular';

import { HostDashboardPageComponent } from './host-dashboard-page/host-dashboard-page.component';
import { HostDashboardSelectComponent } from './host-dashboard-select/host-dashboard-select.component';

import { ActiveVisitsComponent } from './active-visits/active-visits.component';
// import { AppointmentSchedulingComponent } from './appointment-scheduling/appointment-scheduling.component';
import { CaptureVitalsComponent } from './capture-vitals/capture-vitals.component';
import { ConfigureMetadataComponent } from './configure-metadata/configure-metadata.component';
import { DataManagementComponent } from './data-management/data-management.component';
import { FindPatientRecordComponent } from './find-patient-record/find-patient-record.component';
import { RegisterAPatientComponent } from './register-a-patient/register-a-patient.component';
import { ReportsComponent } from './reports/reports.component';
import { SystemAdminnistrationComponent } from './system-adminnistration/system-adminnistration.component';

//import { PageComponent } from './appointment-scheduling/page/page.component';
//import { SelectComponent } from './appointment-scheduling/select/select.component';
//import { ManageAppointmentsComponent } from './appointment-scheduling/manage-appointments/manage-appointments.component';
//import { ManageProviderSchedulesComponent } from './appointment-scheduling/manage-provider-schedules/manage-provider-schedules.component';
//import { ManageServiceTypesComponent } from './appointment-scheduling/manage-service-types/manage-service-types.component';
//import { DailyAppointmentsComponent } from './appointment-scheduling/daily-appointments/daily-appointments.component';

//import { AppointmentRequestsComponent } from './appointment-scheduling/appointment-requests/appointment-requests.component';

import { AppointmentSchedulingModule } from './appointment-scheduling/appointment-scheduling.module';

@NgModule({
    declarations: [
        HostDashboardPageComponent,
        HostDashboardSelectComponent,
         
        FindPatientRecordComponent,
        ActiveVisitsComponent,
        RegisterAPatientComponent, 
        CaptureVitalsComponent,

        // AppointmentSchedulingComponent,

        ReportsComponent,
        DataManagementComponent,
        ConfigureMetadataComponent,
        SystemAdminnistrationComponent,

        //SelectComponent,
        //ManageAppointmentsComponent,
        //ManageProviderSchedulesComponent,
        //ManageServiceTypesComponent,
        //DailyAppointmentsComponent,
        //AppointmentRequestsComponent

    ],
    imports: [
        CommonModule,
        AppSharedModule,
        AdminSharedModule,
        HostDashboardRoutingModule,

        AppointmentSchedulingModule,

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
    ]
})
export class HostDashboardModule {
}
