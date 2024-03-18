import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomizableDashboardComponent } from './customizable-dashboard.component';
import { FindPatientRecordComponent } from './find-patient-record/find-patient-record.component';
import { NavigationEnd, Router } from '@angular/router';

// const routes: Routes = [
//   { path: '', redirectTo: '/customizable-dashboard', pathMatch: 'full', component: CustomizableDashboardComponent },
//   { path: 'find-patient-record', component: FindPatientRecordComponent },
// ];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(
    [{
      path: '',
      children: [
        {
          path: 'find-patient-record',
          loadChildren: () => import('./find-patient-record/find-patient-record.module').then((m) => m.FindPatientRecordModule),
          data: { permission: 'Pages.Administration.Host.Dashboard'}
        }
      ]
    }]
    )],
  exports: [
    RouterModule
  ],
  providers: [],
})
export class CustomizableDashboardRoutingModule { 
  constructor(
    private router: Router
) {
    router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
            window.scroll(0, 0);
        }
    });
}
}
