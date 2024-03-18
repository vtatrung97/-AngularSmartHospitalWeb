import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'medicalviewer',
                        loadChildren: () => import('./medicalviewer/medicalviewer.module').then(m => m.MedicalViewerModule),
                        data: { permission: 'Pages.MedicalViewer' }
                    },
                    {
                        path: 'studyviewer/:patientID/:seriesInstanceUID',
                        loadChildren: () => import('./studyviewer/studyviewer.module').then(m => m.StudyViewerModule),
                        data: { permission: 'Pages.MedicalViewer' }
                    },
                ]
            }])
    ],
    exports: [
        RouterModule
    ]
})
export class RadiogyInformationSystemRoutingModule {
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
