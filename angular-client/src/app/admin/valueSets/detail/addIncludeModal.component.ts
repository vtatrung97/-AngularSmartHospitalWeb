import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { FhirServiceProxy, UserLoginInfoDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'addIncludeModal',
  templateUrl: './addIncludeModal.component.html',
  styleUrls: ['./addIncludeModal.component.less'],
})
export class AddIncludeModalComponent extends AppComponentBase implements OnInit {
  active = false;
  saving = false;
  include = {};

  filters = {
    searchKey: '',
  };

  codeSystems: any[] = [];
  selectedCodeSystem: any = {};
  selectedConcepts: any[] = [];
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  constructor(injector: Injector, private fhirService: FhirServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {}

  init(): void {
    this.include = {
      system: '',
    };
  }

  close(): void {
    this.modal.hide();
  }

  show(): void {
    const self = this;
    self.init();
    self.modal.show();
  }

  save(): void {
    const self = this;
    var selectedConcetps=[];
    if(self.selectedConcepts.length>0){
      self.selectedConcepts.forEach((item,index)=>{
        selectedConcetps.push({code:item.code,display:item.display})
      });
    }
    self.include = {
      system: 'CodeSystem/' + self.selectedCodeSystem.id,
      concept: selectedConcetps,
    };
    self.close();
    self.modalSave.emit(self.include);
  }
  onShown(): void {}

  getCodeSystems(key: string): void {
    const self = this;
    if (key !== '') {
      self.fhirService
        .search('CodeSystem', key)
        .pipe(finalize(() => self.primengTableHelper.hideLoadingIndicator()))
        .subscribe({
          next: (result: any) => {
            self.codeSystems = result.filter(self.checkCodeSystemResource);
          },
        });
    } else {
      self.fhirService
        .read('CodeSystem')
        .pipe(finalize(() => self.primengTableHelper.hideLoadingIndicator()))
        .subscribe({
          next: (result: any) => {
            self.codeSystems = result.filter(self.checkCodeSystemResource);
          },
        });
    }
  }

  onKeySearch($event): void {
    const self = this;
    self.getCodeSystems($event.target.value);
  }

  checkCodeSystemResource(resource) {
    return (resource.resource.resourceType = 'CodeSystem');
  }

  getCodeSystem(item): void {
    this.selectedCodeSystem = item;
  }

  getCodeSystemOption($event: EventListener): void {
  }
}
