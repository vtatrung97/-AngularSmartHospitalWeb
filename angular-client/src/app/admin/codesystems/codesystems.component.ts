import { Component, OnInit, Inject, Input, Injector,ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import {
    FhirServiceProxy
} from 'shared/service-proxies/service-proxies';
import { CreateOrEditCodeSystemModalComponent } from './create-or-edit-codesystem-modal.component';
import { CodeSystemListDto, CodeSystemServiceProxy } from '@shared/service-proxies/codeSystemService-proxies';
import { id } from '@swimlane/ngx-charts';



@Component({
    templateUrl: './codesystems.component.html',
    animations: [appModuleAnimation()]
})

export class CodeSystemsComponent extends AppComponentBase implements OnInit {
    codeSystems: any[];
    selectedCodeSystem: any;
    currentResource:any;
    idSelect: number;

    test: CodeSystemListDto[];

    @ViewChild('createOrEditCodeSystemModal', {static: true}) createOrEditCodeSystemModal: CreateOrEditCodeSystemModalComponent;

    listSelectionChanged = (e) => {
        // this.idSelect = e.addedItems[0];
    };

    constructor(
        injector: Injector,
        private _fhirServiceProxy: FhirServiceProxy,
        private _codeSystemService:CodeSystemServiceProxy,
        public httpClient: HttpClient,
        @Inject(DOCUMENT) document
    ) {
        super(injector);
    }
   
    ngOnInit() {
        this.loadCodeSystems();
    }

    loadCodeSystems(): void {
        var self = this;
        self.primengTableHelper.showLoadingIndicator();
        self._codeSystemService.getCodeSystems().pipe(finalize(()=>self.primengTableHelper.hideLoadingIndicator())).subscribe(
        
            {
               

                next:(result)=>{
                    // result.items.forEach(x => {
                    //     this.idSelect = result.items[x].id;
                    // }),

                    // this.id = result.items[0].id;
                    self.primengTableHelper.records = result.items;
                    self.primengTableHelper.totalRecordsCount = result.items.length;
                    self.primengTableHelper.hideLoadingIndicator();
                }
            }
        )

        // self._fhirServiceProxy.read('CodeSystem').pipe(finalize(() => self.primengTableHelper.hideLoadingIndicator()))
        //     .subscribe(
        //         {
        //             next: (result: any) => {
        //                 if(result){
        //                     self.primengTableHelper.records = result.filter(r=>r.resource.resourceType == 'CodeSystem');
        //                     self.primengTableHelper.totalRecordsCount = result.length;
        //                 }
        //                 self.primengTableHelper.hideLoadingIndicator();
        //             },
        //         }
        //     )
    }

    checkResource(resource) {
        return resource.resourceType = 'CodeSystem';
    }

    onRowSelect(event): void {
        var resource=JSON.parse(this.selectedCodeSystem.jsonResource);
        this.currentResource = resource;
    }

    deleteConcept(concept):void{
        var self=this;
        var index = self.currentResource.concept.indexOf(concept);
        if (index > -1) { // only splice array when item is found
            self.currentResource.concept.splice(index, 1); // 2nd parameter means remove one item only
        }
       var resourceString= JSON.stringify(self.currentResource);
       self.selectedCodeSystem.jsonResource=resourceString;
       self._codeSystemService.updateCodeSystem(self.selectedCodeSystem.id,self.currentResource).subscribe(()=>{
        index=self.primengTableHelper.records.findIndex((obj => obj.id == self.selectedCodeSystem.id));
        self.primengTableHelper.records[index]=self.selectedCodeSystem;
       })
    }

    editConcept(concept):void{
        console.log(concept);
    }

    createCodeSystem():void{
        this.createOrEditCodeSystemModal.show();
    }

    deleteCodeSystem(record:CodeSystemListDto):void{
        const self=this;
        this.message.confirm(
            this.l('CodeSystemDeleteWarningMessage', record.name),
            this.l('AreYouSure'),
            isConfirmed => {
                if (isConfirmed) {
                    self._codeSystemService.delete(record.id).subscribe(()=>{
                        self.notify.success(self.l('SuccessfullyDeleted'));
                        self.loadCodeSystems();
                    });
                }
            }
        );
    }

    downloadCodeSystem(record):void{}
  
}
