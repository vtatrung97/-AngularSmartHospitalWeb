import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { StructureDefinition } from '@shared/fhirModels/structureDefinition';
import { ValueSet } from '@shared/fhirModels/valueSet';
import { ListResultDtoOfLocationDto, LocationServiceProxy } from '@shared/service-proxies/locationService-proxies';
import { StructureDefinitionDto, StructureDefinitionServiceProxy } from '@shared/service-proxies/structureDefinitionService-proxies';
import { ValueSetServiceProxy } from '@shared/service-proxies/valueSetService-proxies';
import { finalize } from 'rxjs/operators';
import { CreateUpdateLocationModalComponent } from './createUpdateLocation/createUpdateLocationModal.component';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.less']
})
export class LocationComponent extends AppComponentBase implements OnInit {
    dataSource: any;
  structureDefinition: StructureDefinition = new StructureDefinition();
  locationData:any={};
    physicalTypeValue:string;
    locationPhysicalTypeList:any=[];
    constructor(injector:Injector,
      private _locationServiceProxy:LocationServiceProxy,
      private _valueSetServiceProxy: ValueSetServiceProxy,
      private _structureDefinitionServiceProxy: StructureDefinitionServiceProxy) {
        super(injector);
     }
     @ViewChild('createUpdateLocationModal', { static: true })
     createOrUpdatLocaltionModalComponent: CreateUpdateLocationModalComponent;
    ngOnInit(): void { 
      this.loadLocations();
      this.loadStructureDefinition();
    }

    loadStructureDefinition():void{
      var self=this;
      this._structureDefinitionServiceProxy
      .getByType('Location')
      .pipe(finalize(() => {}))
      .subscribe({
        next: (result: StructureDefinitionDto) => {
          self.structureDefinition.init(JSON.parse(result.jsonResource));
          // self.getLocationTypeValueSets();
          // self.getLocationStatusList();
          // self.getLocationModeList();
          self.getLocationPhysicalTypeList();
        },
      });
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

    loadLocations():void{
      var self=this;
      self._locationServiceProxy.getLocations().pipe(finalize(()=>self.primengTableHelper.hideLoadingIndicator()))
      .subscribe({
        next:(result:ListResultDtoOfLocationDto)=>{
          self.primengTableHelper.records=result.items;
          self.primengTableHelper.totalRecordsCount=result.items.length;
          self.primengTableHelper.hideLoadingIndicator();
        }
      })
    }

    insertLocationRow($event):void{
    }

    onSaving($event):void{
    }
    editingStart($event):void{
      var locationResource=JSON.parse($event.data.jsonResource);
      console.log(locationResource);
      this.physicalTypeValue=locationResource.physicalType.coding[0].code;
    }
    createLocation():void{
      this.createOrUpdatLocaltionModalComponent.insertStarting();
      this.createOrUpdatLocaltionModalComponent.show();
    }
    editLocation(e):void{
      this.createOrUpdatLocaltionModalComponent.editStarting(JSON.parse(e.data.jsonResource),e.data.id);
      this.createOrUpdatLocaltionModalComponent.show();
    }
}
