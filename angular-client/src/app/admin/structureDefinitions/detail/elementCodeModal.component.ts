import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FhirServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'elementCodeModal',
  templateUrl: './elementCodeModal.component.html',
  styleUrls: ['./elementCodeModal.component.less'],
})
export class ElementCodeModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  valueSets: any[] = [];
  selectedValueSet: any = {};
  element: any={};
  elementIndex:number;
  saving: boolean = false;
  active: boolean = false;
  isChanged: boolean = false;
  constructor(injector: Injector, private _fhirService: FhirServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {}

  onShown(): void {
    this.init();
  }
  init(): void {
    this.selectedValueSet={};
    this.isChanged=false;
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

  loadelement(element:any,index:number):void{
    this.elementIndex=index;
    this.element=element;
    this.active = true;
    this.loadValueSets();
  }

  show(): void {
    this.modal.show();
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
    const self = this;
    self.isChanged=true;
    var codes = [];
    var includes = self.selectedValueSet.compose.include;
    for (var i = 0; i < includes.length; i++) {
      codes.push(...includes[i].concept);
    }

    self.element.code = codes;
  }
}
