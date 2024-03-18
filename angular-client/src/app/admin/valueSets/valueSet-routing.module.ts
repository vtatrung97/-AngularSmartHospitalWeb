import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ValueSetComponent } from './valueSet.component';

const routes: Routes = [{
    path: '',
    component: ValueSetComponent,
    pathMatch: 'full'
}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ValueSetRoutingModule {}