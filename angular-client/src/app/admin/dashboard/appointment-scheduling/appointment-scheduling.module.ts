import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxTabsModule, DxSelectBoxModule } from 'devextreme-angular';
import { DxDataGridModule, DxTemplateModule } from 'devextreme-angular';

import { AppointmentSchedulingRoutingModule } from './appointment-scheduling-routing.module';

import { PageComponent } from './page/page.component';
import { SelectComponent } from './select/select.component';

import { AppointmentRequestsComponent } from './appointment-requests/appointment-requests.component';
import { DailyAppointmentsComponent } from './daily-appointments/daily-appointments.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { ManageProviderSchedulesComponent } from './manage-provider-schedules/manage-provider-schedules.component';
import { ManageServiceTypesComponent } from './manage-service-types/manage-service-types.component';

@NgModule({
  declarations: [
    PageComponent,
    SelectComponent,

    AppointmentRequestsComponent,

    DailyAppointmentsComponent,
    ManageAppointmentsComponent,
    ManageProviderSchedulesComponent,
    ManageServiceTypesComponent
  ],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxTemplateModule,

    AppointmentSchedulingRoutingModule
  ]
})

export class AppointmentSchedulingModule { }
