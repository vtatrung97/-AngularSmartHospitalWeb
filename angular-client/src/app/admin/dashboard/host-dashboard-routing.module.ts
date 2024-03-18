import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

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

import { AppointmentSchedulingModule } from './appointment-scheduling/appointment-scheduling.module';

const routes: Routes = [
    {
        path: '',
        component: HostDashboardPageComponent,
        children: [
            {
                path: '',
                redirectTo: 'select',
                pathMatch: 'full',
            },
            {
                path: 'select',
                component: HostDashboardSelectComponent,
            },
            {
                path: 'find-patient-record',
                component: FindPatientRecordComponent,
            }
            ,
            {
                path: 'active-visits',
                component: ActiveVisitsComponent,
            }
            ,
            {
                path: 'register-a-patient',
                component: RegisterAPatientComponent,
            }
            ,
            {
                path: 'capture-vitals',
                component: CaptureVitalsComponent,
            }
            ,
            {
                path: 'appointment-scheduling',
                loadChildren: () => AppointmentSchedulingModule
            }
            ,
            {
                path: 'reports',
                component: ReportsComponent,
            }
            ,
            {
                path: 'data-management',
                component: DataManagementComponent,
            }
            ,
            {
                path: 'configure-metadata',
                component: ConfigureMetadataComponent,
            }
            ,
            {
                path: 'system-adminnistration',
                component: SystemAdminnistrationComponent,
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
})
export class HostDashboardRoutingModule {
    
}
