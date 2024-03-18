import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { BackboneElement, ElementDefinition } from '@shared/fhirModels/fhir-DataTypes';
import { StructureDefinition } from '@shared/fhirModels/structureDefinition';
import { GeneralPurposeDataTypes } from '@shared/dataTypes/general-purpose-dataTypes';
import {
  StructureDefinitionDto,
  StructureDefinitionServiceProxy,
} from '@shared/service-proxies/structureDefinitionService-proxies';
import { ValueSetServiceProxy } from '@shared/service-proxies/valueSetService-proxies';
import { finalize } from 'rxjs/operators';
import { ValueSetSettingComponent } from '../valueSet/valueSetSetting.component';

@Component({
  selector: 'setting-serviceRequest',
  templateUrl: './serviceRequestSetting.component.html',
  styleUrls: ['./serviceRequestSetting.component.less'],
})
export class ServiceRequestSettingComponent extends AppComponentBase implements OnInit {
  structureDefinition: StructureDefinition = new StructureDefinition();
  currentElement: any;
  valueSet: any = {};
  entityId: number;
  dataTypeList = Object.values(GeneralPurposeDataTypes);

  constructor(
    injector: Injector,
    private _valueSetServiceProxy: ValueSetServiceProxy,
    private _structureDefinitionServiceProxy: StructureDefinitionServiceProxy
  ) {
    super(injector);
  }
  @ViewChild('valueSetSetting', { static: false }) valueSetSetting: ValueSetSettingComponent;

  ngOnInit(): void {
    this.getStructureDefinition();
  }

  getStructureDefinition(): void {
    var self = this;
    this._structureDefinitionServiceProxy
      .getByType('ServiceRequest')
      .pipe(finalize(() => {}))
      .subscribe({
        next: (result: StructureDefinitionDto) => {
          self.structureDefinition.init(JSON.parse(result.jsonResource));
          self.entityId = result.id;
        },
      });
  }

  listSelectionChanged(e): void {
    var self = this;
    self.currentElement = e.addedItems[0];
    self.valueSet = {};
    self.loadValueSet();
  }
  save(e): void {
    var self = this;
    var index = this.structureDefinition.snapshot.element.findIndex((x) => x.id == this.currentElement.id);
    this.structureDefinition.snapshot.element[index] = this.currentElement;
    if (self.structureDefinition.contain == undefined || self.structureDefinition.contain == null) {
      self.structureDefinition.contain = [];
    }
    self.structureDefinition.contain.push(self.valueSet);
    console.log(self.structureDefinition);
    // self._structureDefinitionServiceProxy.updateStructureDefinition(self.entityId,self.structureDefinition).subscribe(() => {
    //   self.notify.success(self.l('SuccessfullyUpdated'));
    // });
  }
  refreshValueSet(): void {
    this.loadValueSet();
  }

  loadValueSet(): void {
    var self = this;
    if (self.currentElement.binding != null) {
      self._valueSetServiceProxy.getValueSetByPath(self.currentElement.binding.valueSet).subscribe({
        next: (result) => {
          self.valueSet = JSON.parse(result.jsonResource);
        },
      });
    } else {
      self.valueSet=null;
      self.valueSetSetting.valueSet = this.valueSet;
    }
  }

  updateValueSet(): void {
    console.log(this.valueSetSetting.valueSet);
    this.valueSet = this.valueSetSetting.valueSet;
  }
}
