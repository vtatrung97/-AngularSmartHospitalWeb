import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { LocalStorageService } from '@shared/utils/local-storage.service';
import { Component, OnInit, Input, Injector, Pipe, PipeTransform, ViewChild } from '@angular/core';

import { finalize } from 'rxjs/operators';
import { AppSessionService } from 'shared/common/session/app-session.service';
import { CreateStructureDefinitionModalComponent } from './createStructureDefinitionModal.component';
import { FhirServiceProxy } from '@shared/service-proxies/service-proxies';
import { ListResultDtoOfStructureDefinitionDto, StructureDefinitionDto, StructureDefinitionServiceProxy } from '@shared/service-proxies/structureDefinitionService-proxies';
import { EditStructureDefinitionModalComponent } from './editStructureDefinitionModal.component';

@Component({
  templateUrl: './structure-definition.component.html',
  animations: [appModuleAnimation()],
})
export class StructureDefinitionComponent extends AppComponentBase implements OnInit {
  selectedStructureDefinition: any = {};
  @ViewChild('createStructureDefinitionModal', { static: true })
  createStructureDefinitionModal: CreateStructureDefinitionModalComponent;

  @ViewChild('editStructureDefinitionModal', { static: true })
  editStructureDefinitionModal: EditStructureDefinitionModalComponent;

  constructor(
    injector: Injector,
    private _localStorageService: LocalStorageService,
    private _appSessionService: AppSessionService,
    private fhirService: FhirServiceProxy,
    private _structureDefinitionService:StructureDefinitionServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadStructureDefinitions();
  }

  loadStructureDefinitions(): void {
    var self = this;

    // self.fhirService
    //   .read('StructureDefinition')
    //   .pipe(finalize(() => self.primengTableHelper.hideLoadingIndicator()))
    //   .subscribe({
    //     next: (result: any) => {
    //       if (result != null) {
    //         self.primengTableHelper.records = result.filter((r) => r.resource.resourceType == 'StructureDefinition');
    //         self.primengTableHelper.totalRecordsCount = result.length;
    //       }
    //       self.primengTableHelper.hideLoadingIndicator();
    //     },
    //   });
    self._structureDefinitionService.getStructureDefinitions().pipe(finalize(()=>self.primengTableHelper.hideLoadingIndicator()))
    .subscribe({
      next:(result:ListResultDtoOfStructureDefinitionDto)=>{
        self.primengTableHelper.records=result.items;
        self.primengTableHelper.totalRecordsCount=result.items.length;
        self.primengTableHelper.hideLoadingIndicator();
      }
    })
  }
  checkResource(resource) {
    return resource.resourceType === 'StructureDefinition';
  }
  onRowSelect($event: EventListener): void {}

  deleteStructureDefinition(record): void {
    const self = this;
    this.message.confirm(
      this.l('DeleteWarningMessage', record.name),
      this.l('AreYouSure'),
      (isConfirmed) => {
        if (isConfirmed) {
          self._structureDefinitionService.delete(record.id).subscribe(() => {
            self.notify.success(self.l('SuccessfullyDeleted'));
            self.loadStructureDefinitions();
          });
        }
      }
    );
  }
  editStructureDefinition(record:StructureDefinitionDto):void{
    var resource=JSON.parse(record.jsonResource);
    this.editStructureDefinitionModal.loadData(record);
    this.editStructureDefinitionModal.show();
  }

  downloadStructureDefinition(record): void {}
  createStructureDefinition(): void {
    this.createStructureDefinitionModal.show();
  }
  onSaving($event):void{

  }
  
  insertLocationRow($event):void{

  }
}
