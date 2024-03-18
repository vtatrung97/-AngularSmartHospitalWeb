import { parseSelectorToR3Selector } from '@angular/compiler/src/core';
import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { StructureDefinition } from '@shared/fhirModels/structureDefinition';
import { ValueSet } from '@shared/fhirModels/valueSet';
import { LocationServiceProxy } from '@shared/service-proxies/locationService-proxies';
import {
  StructureDefinitionDto,
  StructureDefinitionServiceProxy,
} from '@shared/service-proxies/structureDefinitionService-proxies';
import { ValueSetServiceProxy } from '@shared/service-proxies/valueSetService-proxies';
import { result } from 'lodash-es';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { LocationStatus } from '../../../../shared/fhirModels/valueSets-static';

@Component({
  selector: 'createUpdateLocationModal',
  templateUrl: './createUpdateLocationModal.component.html',
  styleUrls: ['./createUpdateLocationModal.component.less'],
})
export class CreateUpdateLocationModalComponent extends AppComponentBase implements OnInit {
  constructor(
    injector: Injector,
    private _locationServiceProxy: LocationServiceProxy,
    private _structureDefinitionServiceProxy: StructureDefinitionServiceProxy,
    private _valueSetServiceProxy: ValueSetServiceProxy
  ) {
    super(injector);
  }
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  saving: boolean = false;
  structureDefinition: StructureDefinition = new StructureDefinition();
  location: any = {
    resourceType: 'Location',
  };
  entityId: number;
  locationTypes: any[] = [];
  locationStatusList: any[] = [];
  locationModeList: any[] = [];
  locationPhysicalTypeList: any[] = [];
  statusList = Object.values(LocationStatus);
  gridDataSource: any;
  physicalTypeValue: string;
  gridBoxValue: string[] = [];
  phoneOptions: any[] = [];
  addressOptions:any[]=[];
  telecomSystems:any[]=[];
  buttonOptions: any = {
    text: this.l('Save'),
    type: 'success',
    useSubmitBehavior: true,
  };
  addAddressButtonOptions:any={
    icon: 'add',
    text: this.l('AddAddress'),
    onClick: () => {
      if(this.location.address==undefined) this.location.address=[];
      this.location.address.push({});
      this.addressOptions=this.getAddressOptions(this.location.address);
    }
  };

  addPhoneButtonOptions: any = {
    icon: 'add',
    text: 'Add phone',
    onClick: () => {
      if (this.location.telecom == undefined) this.location.telecom = [];
      this.location.telecom.push({});
      this.phoneOptions = this.getPhonesOptions(this.location.telecom);
    },
  };
  getCurrentDate(): string {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }
  ngOnInit(): void {
    var self = this;
    this._structureDefinitionServiceProxy
      .getByType('Location')
      .pipe(finalize(() => {}))
      .subscribe({
        next: (result: StructureDefinitionDto) => {
          self.structureDefinition.init(JSON.parse(result.jsonResource));
          self.getLocationTypeValueSets();
          self.getLocationStatusList();
          self.getLocationModeList();
          self.getLocationPhysicalTypeList();
          self.getLocationTelecomSystemList();
        },
      });
  }

  getLocationTypeValueSets(): void {
    var self = this;
    var locationTypeElement = self.structureDefinition.snapshot.element.filter((e) => e.path == 'Location.type')[0];
    self._valueSetServiceProxy.getValueSetByPath(locationTypeElement.binding.valueSet).subscribe((result) => {
      var locationTypeValueSet: ValueSet = new ValueSet();
      locationTypeValueSet.init(JSON.parse(result.jsonResource));
      var concepts = [];
      locationTypeValueSet.compose.include.forEach(function (include, index: number) {
        concepts.push(...include.concept);
      });
      self.locationTypes = concepts;
    });
  }

  getLocationStatusList(): void {
    var self = this;
    var locationStatusElement = self.structureDefinition.snapshot.element.filter((e) => e.path == 'Location.status')[0];
    self._valueSetServiceProxy.getValueSetByPath(locationStatusElement.binding.valueSet).subscribe((result) => {
      var locationStatusValueSet: ValueSet = new ValueSet();
      locationStatusValueSet.init(JSON.parse(result.jsonResource));
      var concepts = [];
      locationStatusValueSet.compose.include.forEach(function (include, index: number) {
        concepts.push(...include.concept);
      });
      self.locationStatusList = concepts;
    });
  }

  getLocationModeList(): void {
    var self = this;
    var locationStatusElement = self.structureDefinition.snapshot.element.filter((e) => e.path == 'Location.mode')[0];
    self._valueSetServiceProxy.getValueSetByPath(locationStatusElement.binding.valueSet).subscribe((result) => {
      var locationModeValueSet: ValueSet = new ValueSet();
      locationModeValueSet.init(JSON.parse(result.jsonResource));
      var concepts = [];
      locationModeValueSet.compose.include.forEach(function (include, index: number) {
        concepts.push(...include.concept);
      });
      self.locationModeList = concepts;
    });
  }

  insertStarting(): void {
    var self = this;
    self.gridBoxValue = [];
    self.physicalTypeValue = '';
    self.locationTypes = [];
    self.location = {
      resourceType: 'Location',
    };
    self.phoneOptions = [];
  }

  editStarting(resource: any, entityId: number): void {
    var self = this;
    self.location = resource;
    self.entityId = entityId;
    self.updataCurrentUI();
  }

  updataCurrentUI() {
    var self = this;
    self.physicalTypeValue = self.location.physicalType.coding[0].code;
    if (self.location.type != null) {
      var locationTypes = [];
      self.location.type.forEach((type) => {
        locationTypes.push(...type.coding);
      });
      if (locationTypes.length > 0) {
        for (var i = 0; i < locationTypes.length; i++) {
          self.gridBoxValue.push(locationTypes[i].code);
        }
      }
    }
  }

  getLocationPhysicalTypeList(): void {
    var self = this;
    var locationPhysicalTypeElement = self.structureDefinition.snapshot.element.filter(
      (e) => e.path == 'Location.physicalType'
    )[0];
    self._valueSetServiceProxy.getValueSetByPath(locationPhysicalTypeElement.binding.valueSet).subscribe((result) => {
      var locationPhysicalTypeValueSet: ValueSet = new ValueSet();
      locationPhysicalTypeValueSet.init(JSON.parse(result.jsonResource));
      var concepts = [];
      locationPhysicalTypeValueSet.compose.include.forEach(function (include, index: number) {
        concepts.push(...include.concept);
      });
      self.locationPhysicalTypeList = concepts;
    });
  }

  getLocationTelecomSystemList(): void {
    var self = this;
    var locationTelecomSystemElement = self.structureDefinition.snapshot.element.filter(
      (e) => e.path == 'Location.telecom.system'
    )[0];
    self._valueSetServiceProxy.getValueSetByPath(locationTelecomSystemElement.binding.valueSet).subscribe((result) => {
      var telecomSystemValueSet: ValueSet = new ValueSet();
      telecomSystemValueSet.init(JSON.parse(result.jsonResource));
      var concepts = [];
      telecomSystemValueSet.compose.include.forEach(function (include, index: number) {
        concepts.push(...include.concept);
      });
      self.telecomSystems = concepts;
    });
  }

  show(): void {
    this.modal.show();
  }
  onShown(): void {
    this.ngOnInit();
  }
  close(): void {
    this.modal.hide();
  }
  onFormSubmit($event): void {
    var self = this;

    var locationTypes: any[] = [];
    if (self.gridBoxValue != null) {
      this.locationTypes.forEach(function (type, i: number) {
        var index = self.gridBoxValue.indexOf(type.code);
        if (index > -1) {
          var locationType = {
            coding: [],
            text: '',
          };
          locationType.coding.push(self.locationTypes[i]);
          locationType.text = type.display;
          locationTypes.push(locationType);
        }
      });
    }
    self.location.type = locationTypes;
    var physicalType: any = {
      coding: [],
      text: '',
    };
    if (self.physicalTypeValue != null) {
      physicalType.coding.push(self.locationPhysicalTypeList.filter((x) => x.code == self.physicalTypeValue)[0]);
      physicalType.text = self.locationPhysicalTypeList.filter((x) => x.code == self.physicalTypeValue)[0].display;
    }
    self.location.physicalType = physicalType;
    if (self.entityId > 0) {
    } else {
      self._locationServiceProxy.createLocation(self.location).subscribe(() => {
        self.notify.success(self.l('SuccessfullyAdded'));
        self.saving = false;
        self.close();
        self.modalSave.emit(null);
      });
    }
  }

  getAddressOptions(address: any) {
    const options = [];
    for (let i = 0; i < address.length; i++) {
      options.push(this.generateNewAddressOptions(i));
    }
    return options;
  }
  
  generateNewAddressOptions(index: number) {
    return {
      buttons: [
        {
          name: 'trash',
          location: 'after',
          options: {
            stylingMode: 'text',
            icon: 'trash',
            onClick: () => {
              this.location.address.splice(index, 1);
              this.addressOptions = this.getAddressOptions(this.location.address);
            },
          },
        },
      ],
    };
  }

  getPhonesOptions(telecom: any) {
    const options = [];
    for (let i = 0; i < telecom.length; i++) {
      options.push(this.generateNewPhoneOptions(i));
    }
    return options;
  }
  generateNewPhoneOptions(index: number) {
    return {
      mask: '+84 (X00) 000-000',
      maskRules: { X: /[01-9]/ },
      buttons: [
        {
          name: 'trash',
          location: 'after',
          options: {
            stylingMode: 'text',
            icon: 'trash',
            onClick: () => {
              this.location.telecom.splice(index, 1);
              this.phoneOptions = this.getPhonesOptions(this.location.telecom);
            },
          },
        },
      ],
    };
  }
}
