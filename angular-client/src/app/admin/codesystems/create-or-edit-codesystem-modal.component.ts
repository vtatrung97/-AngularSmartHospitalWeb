import { Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FhirServiceProxy, UserLoginInfoDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PermissionTreeComponent } from '../shared/permission-tree.component';
import { finalize } from 'rxjs/operators';
import { PublishStatus, CodeSystemHierarchyMeaning ,CodeSystemHierarchyMeanings} from '../../../shared/fhirModels/valueSets-static';
import { CodeSystemServiceProxy } from '@shared/service-proxies/codeSystemService-proxies';


@Component({
  selector: 'createOrEditCodeSystemModal',
  templateUrl: './create-or-edit-codesystem-modal.component.html',
})
export class CreateOrEditCodeSystemModalComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  active = false;
  saving = false;
  currentUser: UserLoginInfoDto = this.appSession.user;
  now =new Date();
  codeSystem: any = {};

  publishStatusList = Object.values(PublishStatus);
  hierarchyMeanings = Object.values(CodeSystemHierarchyMeaning);
  codeSystemHierarchyMeanings=CodeSystemHierarchyMeanings;
  constructor(injector: Injector, private _fhirService: FhirServiceProxy,private _codeSystemService:CodeSystemServiceProxy) {
    super(injector);
  }

  getCurrentDate():string{
    var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      return yyyy + '-' + mm + '-' + dd;
  }

  onShown(): void {}

  show(codeSystemId?: string): void {
    const self = this;
    self.active = true;
    self.init();
    self.modal.show();
  }
  addNewConcept():void{
    this.codeSystem.concept.push({});
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }

  init(): void {
    this.codeSystem={
      id:'',
      description:'',
      publisher: this.currentUser.name,
      resourceType:'CodeSystem',
      version:'1.0.0',
      content:"not-present",
      caseSensitive:true,
      hierarchyMeaning :"is-a",
      date:this.getCurrentDate(),
      concept:[]
    };
}
  save(): void {
    this.saving = true;
    const self = this;
    self._codeSystemService.createCodeSystem(self.codeSystem).subscribe(() => {
      self.notify.success(self.l('SuccessfullyAdded'));
      self.saving = false;
      self.close();
    self.modalSave.emit(null);
  });
  //   self._fhirService.post(self.codeSystem).subscribe(() => {
  //     self.notify.success(self.l('SuccessfullyAdded'));
  //     self.saving = false;
  //     self.close();
  //   self.modalSave.emit(null);
  // });
  }
  
}
