import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudyViewerComponent } from './studyviewer.component';

const routes: Routes = [{
    path: '',
    component: StudyViewerComponent,
    pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudyViewerRoutingModule {
}
