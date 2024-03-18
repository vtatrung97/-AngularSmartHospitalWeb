import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MeetingComponent } from './meeting.component';

const routes: Routes = [{
    path: '',
    component: MeetingComponent,
    pathMatch: 'full'
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MeetingRoutingModule {}