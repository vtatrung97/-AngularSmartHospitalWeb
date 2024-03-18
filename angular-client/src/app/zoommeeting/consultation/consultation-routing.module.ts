import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConsultationComponent } from './consultation.component';

const routes: Routes = [{
    path: '',
    component: ConsultationComponent,
    pathMatch: 'full'
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConsultationRoutingModule {}