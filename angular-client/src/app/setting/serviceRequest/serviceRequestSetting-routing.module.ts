import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceRequestSettingComponent } from './serviceRequestSetting.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ServiceRequestSettingComponent,
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class ServiceRequestSettingRoutingModule {}
