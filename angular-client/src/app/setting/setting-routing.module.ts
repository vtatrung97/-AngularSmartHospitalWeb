import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'servicerequest',
                        loadChildren: () => import('./serviceRequest/serviceRequestSetting.module').then(m => m.ServiceRequestSettingModule),
                        data: { permission: 'Pages.MedicalViewer' }
                    },
                ]
            }])
    ],
    exports: [
        RouterModule
    ]
})
export class SettingRoutingModule {
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