import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindPatientRecordComponent } from './find-patient-record.component';

// const routes: Routes = [{
//   path: '',
//   component: FindPatientRecordComponent,
//   pathMatch: 'full'
// }];

@NgModule({
  imports: [RouterModule.forChild([ 
    {
      path: '',
      component: FindPatientRecordComponent,
    },
  ])],
  exports: [RouterModule],
  providers: [],
})
export class FindPatientRecordRoutingModule { }
