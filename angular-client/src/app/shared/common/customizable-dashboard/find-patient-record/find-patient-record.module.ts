import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';

import { FindPatientRecordRoutingModule } from './find-patient-record-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppSharedModule, 
    AdminSharedModule,
    FindPatientRecordRoutingModule
  ]
})
export class FindPatientRecordModule { }
