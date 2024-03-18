import {
    TokenService,
    LogService,
    MessageService,
    LocalizationService,
} from 'abp-ng2-module';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConsts } from '@shared/AppConsts';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { LocalStorageService } from '@shared/utils/local-storage.service';
import { MedicalViewerQueryArchiveServiceProxy, QueryOptions } from 'shared/service-proxies/service-proxies';

@Injectable()
export class MedicalViewerService {

    authCookie: any = {};
    constructor(
        private _medicalViewerQueryArchiveServiceProxy: MedicalViewerQueryArchiveServiceProxy,
        private _localStorageService: LocalStorageService
    ) {
        this.GetMedicalViewerAuthCookie();
    }

    GetMedicalViewerAuthCookie() {
        var self = this;
        this._localStorageService.getItem('medicalViewerAuthCookie', function (err, value: string) {
            self.authCookie.value = value;
        })
    }

    FindStudies(): void {
        var self = this;
        self._medicalViewerQueryArchiveServiceProxy.findStudies(new QueryOptions(), self.authCookie).subscribe({
            next: (result: any) => {
                console.log(result);
            }
        });
    }
}
