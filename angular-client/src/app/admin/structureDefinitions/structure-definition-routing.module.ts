import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StructureDefinitionDetailComponent } from './detail/structureDefinitionDetail.component';
import { StructureDefinitionComponent } from './structure-definition.component';

const routes: Routes = [{
    path: '',
    component: StructureDefinitionComponent,
    pathMatch: 'full'
},{
    path: 'detail/:id',
    component: StructureDefinitionDetailComponent,
    pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StructureDefinitionRoutingModule {
}
