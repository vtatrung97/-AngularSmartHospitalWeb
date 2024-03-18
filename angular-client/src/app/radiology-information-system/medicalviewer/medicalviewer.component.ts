import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { LocalStorageService } from '@shared/utils/local-storage.service';
import { MedicalViewerService } from './medicalViewer.service';
import { Component, OnInit, Input, Injector, NgZone } from '@angular/core';
import {
    MedicalViewerGetPatientURLModel, MedicalViewerAuthServiceProxy,
    MedicalViewerQueryArchiveServiceProxy, QueryOptions,
    StudyQueryOptions,
} from 'shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { AppSessionService } from 'shared/common/session/app-session.service';
import { ConclusionSignalrService } from '../conclusion/conclusion-signalr.service'
import { SignalRHelper } from 'shared/helpers/SignalRHelper';

@Component({
    templateUrl: './medicalviewer.component.html',
    animations: [appModuleAnimation()],
    styleUrls: ['./medicalviewer.component.less']
})

export class MedicalViewerComponent extends AppComponentBase implements OnInit {

    dataSource: any;

    authCookie = {
        value: ''
    };
    selectedStudy: any;
    studies: any[] = [];
    queryOptions: QueryOptions = new QueryOptions();
    series: any[] = [];
    images: any[] = [];
    text2: string;

    constructor(
        injector: Injector,
        private _localStorageService: LocalStorageService,
        private _medicalViewerQueryArchiveServiceProxy: MedicalViewerQueryArchiveServiceProxy,
        private _medicalViewerAuthServiceProxy: MedicalViewerAuthServiceProxy,
        private _appSessionService: AppSessionService,
        private _conclusionSignalrService: ConclusionSignalrService,
        private _zone: NgZone
    ) {
        super(injector);

        this.dataSource = {
            store: {
              type: 'odata',
              key: 'Task_ID',
              url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
            },
            expand: 'ResponsibleEmployee',
            select: [
              'Task_ID',
              'Task_Subject',
              'Task_Status',
              'Task_Assigned_Employee_ID'
            ]
        }

    }

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    ngOnInit() {
        this.init();

    }

    findStudies(): void {
        var self = this;
        self.primengTableHelper.showLoadingIndicator();
        this._localStorageService.getItem('medicalViewerAuthCookie', function (err, value: string) {
            self.authCookie.value = value;
            self._medicalViewerQueryArchiveServiceProxy.findStudies(self.queryOptions, value)
                .pipe(finalize(() => self.primengTableHelper.hideLoadingIndicator()))
                .subscribe(
                    {
                        next: (result: any[]) => {
                            self.primengTableHelper.records = result;
                            self.primengTableHelper.totalRecordsCount = result.length;
                            self.primengTableHelper.hideLoadingIndicator();
                        },
                    }
                )
        });
    }
    onRowSelect(event) {
        var self = this;
        encodeURIComponent(self.authCookie.value);
        self.primengTableHelper.showLoadingIndicator();
        var queryOptions = new QueryOptions();
        queryOptions.StudiesOptions = new StudyQueryOptions();
        queryOptions.StudiesOptions.StudyInstanceUID = event.data.InstanceUID;
        self._medicalViewerQueryArchiveServiceProxy.findSeries(queryOptions, self.authCookie.value)
            .pipe(finalize(() => self.primengTableHelper.hideLoadingIndicator()))
            .subscribe(
                {
                    next: (result: any[]) => {
                        self.series = result;
                        self.primengTableHelper.hideLoadingIndicator();
                        self.images = [

                        ];
                    },
                }
            )
    }
    enCodeUri(value): string {
        return encodeURIComponent(value);
    }
    viewImage(serie: any): void {
        var self = this;
        //let url: string = '';
        let requestBody: MedicalViewerGetPatientURLModel = new MedicalViewerGetPatientURLModel();
        requestBody.authenticationCookie = self.authCookie.value;
        requestBody.email = 'viet@pacs.net.vn';
        requestBody.phoneNumber = self._conclusionSignalrService.connection.connectionId;
        requestBody.userName = self._appSessionService.user.userName;
        requestBody.flags = 0;
        requestBody.patientID = serie.Patient.ID;
        requestBody.requireAuthentication = true;
        requestBody.miniToolbar = "full";
        requestBody.seriesInstanceUID = serie.InstanceUID;
        self._medicalViewerAuthServiceProxy.getPatientURL(requestBody).subscribe(
            {
                next: (result: string) => {
                    var url = result.substr(1);
                    url = url.slice(0, -1);
                    window.open(url);

                },
            }
        );

        //window.open('http://localhost/MedicalViewer22/#/login/automate/' + self.enCodeUri(self.authCookie.value),
        //    'myWindow', 'location=yes,scrollbars=yes,status=yes');
    }
    init(): void {
        SignalRHelper.initSignalR(() => {
            this._conclusionSignalrService.init();
        });

        this.registerEvents();
    }
    registerEvents(): void {
        const self = this;
        function onMessageReceived(message) {
            self.images.push({
                previewImageSrc: "http://localhost/MedicalViewerServiceAsp22" + message,
                thumbnailImageSrc: "http://localhost/MedicalViewerServiceAsp22" + message,
                alt: "",
                title: ""
            });
            self.getImages();
        }

        abp.event.on('app.conclusion.messageReceived', message => {
            self._zone.run(() => {
                onMessageReceived(message);
            });
        });
    }
    getImages(): any[] {
        return this.images;
    }
    loadImages(event) {
        //event.first = First row offset
        //event.rows = Number of rows per page
    }
}
