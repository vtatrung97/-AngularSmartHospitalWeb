import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './list/patientlist.component';


@NgModule({
    declarations: [],
    imports: [  
        RouterModule.forChild([
        {
            path: '',
            component:PatientListComponent
        }]) ],
        exports: [
            RouterModule
        ],
    providers: [],
})
export class PatientRoutingModule {
    constructor(
        private router: Router
    ) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scroll(0, 0);
            }
        });
    }
}
