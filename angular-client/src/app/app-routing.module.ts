import { NgModule } from '@angular/core';
import { NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from './shared/common/auth/auth-route-guard';
import { NotificationsComponent } from './shared/layout/notifications/notifications.component';
import { NgxSpinnerService } from 'ngx-spinner';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'app',
                component: AppComponent,
                canActivate: [AppRouteGuard],
                canActivateChild: [AppRouteGuard],
                children: [
                    {
                        path: '',
                        children: [
                            { path: 'notifications', component: NotificationsComponent },
                            { path: '', redirectTo: '/app/main/dashboard', pathMatch: 'full' }
                        ]
                    },
                    {
                        path: 'main',
                        loadChildren: () => import('app/main/main.module').then(m => m.MainModule), //Lazy load main module
                        data: { preload: true }
                    },
                    {
                        path: 'admin',
                        loadChildren: () => import('app/admin/admin.module').then(m => m.AdminModule), //Lazy load admin module
                        data: { preload: true },
                        canLoad: [AppRouteGuard]
                    },
                    {
                        path: 'ris',
                        loadChildren: () => import('app/radiology-information-system/radiology-information-system.module').then(m => m.RadiogyInformationSystemModule), //Lazy load RIS module
                        data: { preload: true },
                        canLoad: [AppRouteGuard]
                    },
                    {
                        path: 'zoom-meeting',
                        loadChildren: () => import('app/zoommeeting/zoommeeting.module').then(m => m.ZoomMeetingModule), //Lazy load zoom meeting module
                        data: { preload: true },
                        canLoad: [AppRouteGuard]
                    },
                    {
                        path: 'patients',
                        loadChildren: () => import('app/patient/patient.module').then(m => m.PatientModule), //Lazy load zoom meeting module
                        data: { preload: true },
                        canLoad: [AppRouteGuard]
                    },
                    {
                        path: 'orders',
                        loadChildren: () => import('app/orderRequest/orderrequest.module').then(m => m.OrderRequestModule), //Lazy load orders meeting module
                        data: { preload: true },
                        canLoad: [AppRouteGuard]
                    },
                    {
                        path: 'settings',
                        loadChildren: () => import('app/setting/setting.module').then(m => m.SettingModule), //Lazy load orders meeting module
                        data: { preload: true },
                        canLoad: [AppRouteGuard]
                    },
                    {
                        path: 'shared-dashboard',
                        loadChildren: () => import('app/shared/common/customizable-dashboard/customizable-dashboard.module').then(m => m.CustomizableDashboardModule), //Lazy load orders meeting module
                        data: { preload: true },
                        canLoad: [AppRouteGuard]
                    },
                    {
                        path: '**', redirectTo: 'notifications'
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {
    constructor(
        private router: Router,
        private spinnerService: NgxSpinnerService
    ) {
        router.events.subscribe((event) => {

            if (event instanceof RouteConfigLoadStart) {
                spinnerService.show();
            }

            if (event instanceof RouteConfigLoadEnd) {
                spinnerService.hide();
            }

            if (event instanceof NavigationEnd) {
                document.querySelector('meta[property=og\\:url').setAttribute('content', window.location.href);
            }
        });
    }
}
