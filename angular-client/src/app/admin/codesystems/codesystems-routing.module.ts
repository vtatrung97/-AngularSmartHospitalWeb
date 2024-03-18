import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CodeSystemsComponent } from './codesystems.component';

const routes: Routes = [
    {
    path: '',
    component: CodeSystemsComponent,
    pathMatch: 'full'
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CodeSystemsRoutingModule {
}
