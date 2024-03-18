import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { LocalStorageService } from '@shared/utils/local-storage.service';
import { Component, OnInit, Input, Injector, Pipe, PipeTransform } from '@angular/core';
import {
    MedicalViewerGetPatientURLModel, MedicalViewerAuthServiceProxy,
    MedicalViewerQueryArchiveServiceProxy, QueryOptions,
    StudyQueryOptions,
} from 'shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { AppSessionService } from 'shared/common/session/app-session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
    templateUrl: './studyviewer.component.html',
    animations: [appModuleAnimation()]
})

export class StudyViewerComponent extends AppComponentBase implements OnInit  {
    viewerUrl: SafeResourceUrl;

    constructor(
        injector: Injector,
        private _localStorageService: LocalStorageService,
        private _medicalViewerQueryArchiveServiceProxy: MedicalViewerQueryArchiveServiceProxy,
        private _medicalViewerAuthServiceProxy: MedicalViewerAuthServiceProxy,
        private _appSessionService: AppSessionService,
        private _activatedRoute: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) {
        super(injector);
    }

    ngOnInit() {
        var self = this;
        var patientID = this._activatedRoute.snapshot.paramMap.get('patientID');
        var seriesInstanceUID = this._activatedRoute.snapshot.paramMap.get('seriesInstanceUID');

        //this._activatedRoute.queryParams.subscribe((params: Params) => {
        //    console.log(params['entityFullName']);
        //});
        this._localStorageService.getItem('medicalViewerAuthCookie', function (err, value: string) {
            //self.authCookie.value = value;
            let requestBody: MedicalViewerGetPatientURLModel = new MedicalViewerGetPatientURLModel();
            requestBody.authenticationCookie = value;
            requestBody.email = 'viet@pacs.net.vn';
            requestBody.phoneNumber = '111111';
            requestBody.userName = self._appSessionService.user.userName;
            requestBody.flags = 0;
            requestBody.patientID = patientID;
            requestBody.requireAuthentication = true;
            requestBody.miniToolbar = "full";
            requestBody.seriesInstanceUID = seriesInstanceUID;
            self._medicalViewerAuthServiceProxy.getPatientURL(requestBody).subscribe(
                {
                    next: (result: string) => {
                        var url = result.substr(1);
                        url = url.slice(0, -1);
                        //console.log(url);
                        //window.open(url);
                        self.viewerUrl = self.sanitizer.bypassSecurityTrustResourceUrl(url);
                    },
                }
            );
        })

    }
}
