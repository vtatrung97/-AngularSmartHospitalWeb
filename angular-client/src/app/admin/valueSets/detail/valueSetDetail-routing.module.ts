import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ValueSetDetailComponent } from './valueSetDetail.component';

const routes: Routes = [{
    path: '',
    component: ValueSetDetailComponent,
    pathMatch: 'full'
}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ValueSetDetailRoutingModule {}