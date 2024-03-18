import { Component, OnInit, Inject, Input, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { FhirServiceProxy } from 'shared/service-proxies/service-proxies';
import { CreateOrUpdateValueSetModalComponent } from './createOrUpdateValueSetModal.component';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import {
  ListResultDtoOfValueSetDto,
  ValueSetListDto,
  ValueSetServiceProxy,
} from '@shared/service-proxies/valueSetService-proxies';

@Component({
  selector: 'app-valueSet',
  templateUrl: './valueSet.component.html',
  styleUrls: ['./valueSet.component.less'],
  animations: [appModuleAnimation()],
})
export class ValueSetComponent extends AppComponentBase implements OnInit {

  dataSource: any;
  
  @ViewChild('createOrUpdateValueSetModal', { static: true })
  createOrUpdateValueSetModalComponent: CreateOrUpdateValueSetModalComponent;
  selectedValueSet:ValueSetListDto;
  currentData:any;
  constructor(
    injector: Injector,
    private _fhirServiceProxy: FhirServiceProxy,
    private _valueSetService: ValueSetServiceProxy,
    private _router: Router,
    public httpClient: HttpClient,
    @Inject(DOCUMENT) document
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadValueSets();
  }

  loadValueSets(): void {
    var self = this;
    self.primengTableHelper.showLoadingIndicator();
    self.primengTableHelper.showLoadingIndicator();
    self._valueSetService
      .getValueSets()
      .pipe(finalize(() => self.primengTableHelper.hideLoadingIndicator()))
      .subscribe({
        next: (result: ListResultDtoOfValueSetDto) => {
          self.primengTableHelper.records = result.items;
          self.primengTableHelper.totalRecordsCount = result.items.length;
        },
      });
    // self._fhirServiceProxy
    //   .read('ValueSet')
    //   .pipe(finalize(() => self.primengTableHelper.hideLoadingIndicator()))
    //   .subscribe({
    //     next: (result: any) => {
    //       if (result != null) {
    //         self.primengTableHelper.records = result.filter(r=>r.resource.resourceType=='ValueSet');
    //         self.primengTableHelper.totalRecordsCount = result.length;
    //       }
    //       self.primengTableHelper.hideLoadingIndicator();
    //     },
    //   });
  }

  checkResource(resource) {
    return (resource.resourceType = 'ValueSet');
  }

  createValueSet(): void {
    const self=this;
    self.createOrUpdateValueSetModalComponent.valueSet=new ValueSetListDto();
    self.createOrUpdateValueSetModalComponent.init();
    self.createOrUpdateValueSetModalComponent.show();
  }
  deleteValueSet(record): void {
    const self = this;
    this.message.confirm(
      this.l('ValueSetDeleteWarningMessage', record.name),
      this.l('AreYouSure'),
      (isConfirmed) => {
        if (isConfirmed) {
          self._valueSetService.delete(record.id).subscribe(() => {
            self.notify.success(self.l('SuccessfullyDeleted'));
            self.loadValueSets();
          });
        }
      }
    );
  }

  editValueSet(record: ValueSetListDto): void {
    const self=this;
    self.selectedValueSet=record;
    self.currentData=JSON.parse(record.jsonResource);
    self.createOrUpdateValueSetModalComponent.valueSet=self.selectedValueSet;
    self.createOrUpdateValueSetModalComponent.init();
    self.createOrUpdateValueSetModalComponent.show();
  }
  downloadValueSet(record): void {}
}
