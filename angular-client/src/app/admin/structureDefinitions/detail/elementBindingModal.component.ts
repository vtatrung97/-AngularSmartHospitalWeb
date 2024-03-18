import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FhirServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'elementBindingModal',
  templateUrl: './elementBindingModal.component.html',
  styleUrls: ['./elementBindingModal.component.less'],
})
export class ElementBindingModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  element: any = {};
  valueSets: any[] = [];
  selectedValueSet: any = {};
  constructor(injector: Injector, private _fhirService: FhirServiceProxy) {
    super(injector);
  }
  saving: boolean = false;
  active: boolean = false;
  ngOnInit(): void {}
  onShown(): void {
    this.init();
  }

  init(): void {
    this.active = true;
    this.element = {
    };
    this.loadValueSets();
  }

  show(): void {
    this.modal.show();
  }
  close(): void {
    this.modal.hide();
  }
  save(): void {
    const self = this;
    self.element.id = self.element.path;
    self.saving = false;
    self.close();
    self.modalSave.emit(self.element);
  }

  loadValueSets(): void {
    const self = this;
    self._fhirService
      .read('ValueSet')
      .pipe(finalize(() => self.primengTableHelper.hideLoadingIndicator()))
      .subscribe({
        next: (result: any) => {
          self.valueSets = result;
        },
      });
  }
  checkValueSetResource(resource) {
    return (resource.resourceType = 'ValueSet');
  }

  onvalueSetChanged($event: EventListener): void {
    const self=this;
    var codes=[];
    var includes= self.selectedValueSet.compose.include;
    for(var i=0;i<includes.length;i++){
      codes.push(...includes[i].concept);
    }

    self.element.code=codes;
  }
}
