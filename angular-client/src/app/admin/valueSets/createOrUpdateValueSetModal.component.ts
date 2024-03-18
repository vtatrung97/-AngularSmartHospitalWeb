import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { FhirServiceProxy, UserLoginInfoDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { PublishStatus } from '../../../shared/fhirModels/valueSets-static';
import { finalize } from 'rxjs/operators';
import { CodeSystemsRoutingModule } from '../codesystems/codesystems-routing.module';
import { ValueSetListDto, ValueSetServiceProxy } from '@shared/service-proxies/valueSetService-proxies';
import { AddNewIncludeModalComponent } from './addNewInclude/addNewIncludeModal.component';

@Component({
  selector: 'createOrUpdateValueSetModal',
  templateUrl: './createUpdateValueSetModal.component.html',
  styleUrls: ['./createUpdateValueSetModal.component.less'],
})
export class CreateOrUpdateValueSetModalComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('addNewIncludeModal', { static: true })
  addNewIncludeModal: AddNewIncludeModalComponent;

  active = false;
  saving = false;
  valueSet: ValueSetListDto = new ValueSetListDto();
  valueSetResource: any = {};
  currentUser: UserLoginInfoDto = this.appSession.user;
  filters = {
    searchKey: '',
  };
  codeSystems: any[] = [];
  selectedCodeSystem: any = {};
  selectedConcepts: any[] = [];

  publishStatusList = Object.values(PublishStatus);
  constructor(
    injector: Injector,
    private _fhirService: FhirServiceProxy,
    private _valueSetService: ValueSetServiceProxy,
    private _router: Router
  ) {
    super(injector);
  }

  checkCodeSystemResource(record) {
    return (record.resource.resourceType = 'CodeSystem');
  }

  onShown(): void {}
  show(): void {
    const self = this;
    this.active = true;
    this.init();
    this.modal.show();
    // this._router.navigate(['app/admin/valueSets/create'])
  }
  init(): void {
    const self = this;
    self.selectedCodeSystem = {};
    self.selectedConcepts = [];

    if (self.valueSet.jsonResource != null) {
      self.valueSetResource = JSON.parse(self.valueSet.jsonResource);
    } else {
      self.valueSetResource = {
        compose: {
          include: [],
        },
      };
    }
  }
  close(): void {
    this.modal.hide();
  }

  getCurrentDate(): string {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }
  save(): void {
    const self = this;
    var selectedConcetps = [];
    if (self.valueSet.id != null) {
      self._valueSetService.update(self.valueSet.id, self.valueSetResource).subscribe(() => {
        self.notify.success(self.l('SuccessfullyUpdated'));
        self.saving = false;
        self.close();
        self.modalSave.emit(null);
      });
    } else {
      self._valueSetService.createValueSet(self.valueSetResource).subscribe(() => {
        self.notify.success(self.l('SuccessfullyAdded'));
        self.saving = false;
        self.close();
        self.modalSave.emit(null);
      });
    }
  }

  onvalueSetComposeChanged($event: EventListener): void {}
  onKeySearch($event?: EventListener): void {}
  onAddInclude(): void {
    this.addNewIncludeModal.show();
  }
  loadIncludes(): void {
    const self = this;
    self.addNewIncludeModal.includes.forEach((item) => {
      self.valueSetResource.compose.include.push(item);
    });
  }
}
