import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@NgModule({
    declarations: [],
    imports: [  
        RouterModule.forChild([
        {
            path: '',
            children: [
                {
                    path: 'meeting',
                    loadChildren: () => import('./meeting/meeting.module').then(m => m.MeetingModule),
                    data: { permission: 'Pages.Meeting' }
                },
                {
                    path: 'consultation',
                    loadChildren: () => import('./consultation/consultation.module').then(m => m.ConsultationModule),
                    data: { permission: 'Pages.Meeting' }
                }
            ]
        }]) ],
    exports: [
        RouterModule
    ],
    providers: [],
})
export class ZoomMeetingRoutingModule {
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