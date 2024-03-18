import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PublishStatus, StrengthBindingElementList } from '@shared/fhirModels/valueSets-static';
import { UserLoginInfoDto } from '@shared/service-proxies/service-proxies';
import { StructureDefinitionDto, StructureDefinitionServiceProxy } from '@shared/service-proxies/structureDefinitionService-proxies';
import { ValueSetListDto, ValueSetServiceProxy } from '@shared/service-proxies/valueSetService-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'editStructureDefinitionModal',
  templateUrl: './editStructureDefinitionModal.component.html',
  styleUrls: ['./editStructureDefinitionModal.component.less'],
})
export class EditStructureDefinitionModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('editModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  saving: boolean = false;
  structureDefinition: any = {};
  structureDefinitionEntity: StructureDefinitionDto;
  currentUser: UserLoginInfoDto = this.appSession.user;
  publishStatusList = Object.values(PublishStatus);
  valueSets:ValueSetListDto[];
  strengthBindingElementList=Object.values(StrengthBindingElementList);

  constructor(injector: Injector,private _structureDefinitionService:StructureDefinitionServiceProxy,private valueSetService:ValueSetServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    this.init();
  }
  show(): void {
    this.modal.show();
  }
  close(): void {
    this.modal.hide();
  }
  onShown(): void {
    this.init();
  }
  loadData(structureDefinition:StructureDefinitionDto):void{
    this.structureDefinitionEntity=structureDefinition;
    this.structureDefinition=JSON.parse(structureDefinition.jsonResource);
  }
  init():void{
    var self=this;
    self.loadValueSets();
  }
  onTypeChange($event): void {
    var firstPath = this.structureDefinition.type;
    this.structureDefinition.snapshot.element[0].id = firstPath;
    this.structureDefinition.snapshot.element[0].path = firstPath;
    this.structureDefinition.snapshot.element[1].id = 'id';
    this.structureDefinition.snapshot.element[1].path = firstPath + '.id';
  }
  onElementMinChange($event, i): void {
    this.structureDefinition.snapshot.element[i].base.min = this.structureDefinition.min;
  }

  onElementMaxChange($event, i): void {
    this.structureDefinition.snapshot.element[i].base.max = this.structureDefinition.max;
  }

  onElementIdChange($event, i): void {
    this.structureDefinition.snapshot.element[i].path =
      this.structureDefinition.type + '.' + this.structureDefinition.snapshot.element[i].id;
  }
  getCurrentDate(): string {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }
  onAddElement(): void {
    this.structureDefinition.snapshot.element.push({
      id: '',
      path: '.',
      definition: '',
      base: {
        max: '*',
        min: 0
      },
      type:[{code:""}]
    });
  }
  save(): void {
    const self = this;
    console.log(self.structureDefinition);
    self._structureDefinitionService.updateStructureDefinition(self.structureDefinitionEntity.id, self.structureDefinition).subscribe(() => {
        self.notify.success(self.l('SuccessfullyUpdated'));
        self.saving = false;
        self.close();
        self.modalSave.emit(null);
      });
  }

  addBindingElement(index:number):void{
    var self=this;
    self.structureDefinition.snapshot.element[index].binding={
        strength:"",
        valueSet:""
    };
  }

  loadValueSets():void{
    var self=this;
    self.valueSetService.getValueSets().pipe(finalize(()=>self.primengTableHelper.hideLoadingIndicator()))
    .subscribe({
      next:(result)=>{
        self.valueSets=result.items;
      }
    })
  }
}
