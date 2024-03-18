import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageComponent } from './page/page.component';
import { SelectComponent } from './select/select.component';

import { AppointmentRequestsComponent } from './appointment-requests/appointment-requests.component';
import { DailyAppointmentsComponent } from './daily-appointments/daily-appointments.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { ManageProviderSchedulesComponent } from './manage-provider-schedules/manage-provider-schedules.component';
import { ManageServiceTypesComponent } from './manage-service-types/manage-service-types.component';

const routes: Routes = [
  {
    path: '',
    //path: 'appointment-scheduling',
    component: PageComponent,
    children: [
      {
        path: '',
        redirectTo: 'select',
        pathMatch: 'full',
      },
      {
        path: 'select',
        component: SelectComponent
      },
      {
        path: 'appointment-requests',
        component: AppointmentRequestsComponent
      },
      {
        path: 'daily-appointments',
        component: DailyAppointmentsComponent
      },
      {
        path: 'manage-appointments',
        component: ManageAppointmentsComponent
      },
      {
        path: 'manage-provider-schedules',
        component: ManageProviderSchedulesComponent
      },
      {
        path: 'manage-service-types',
        component: ManageServiceTypesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentSchedulingRoutingModule { }
