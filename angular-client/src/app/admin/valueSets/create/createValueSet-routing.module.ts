import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { CreateValueSetComponent } from './createValueSetPage.component';

const routes: Routes = [{
    path: '',
    component: CreateValueSetComponent,
    pathMatch: 'full'
}];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CreateValueSetRoutingModule {}