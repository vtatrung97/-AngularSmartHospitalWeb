import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PublishStatus } from '@shared/fhirModels/valueSets-static';
import { FhirServiceProxy, UserLoginInfoDto } from '@shared/service-proxies/service-proxies';
import { StructureDefinitionServiceProxy } from '@shared/service-proxies/structureDefinitionService-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'createStructureDefinitionModal',
  templateUrl: './createStructureDefinitionModal.component.html',
  styleUrls: ['./createStructureDefinitionModal.component.less'],
})
export class CreateStructureDefinitionModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  publishStatusList = Object.values(PublishStatus);
  structureDefinition: any = {};
  saving: boolean = false;
  currentUser: UserLoginInfoDto = this.appSession.user;

  constructor(
    injector: Injector,
    private _structureDefinitionService: StructureDefinitionServiceProxy,
    private fhirService: FhirServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

  onShown(): void {
    this.init();
  }

  init(): void {
    this.structureDefinition = {
      publisher: this.currentUser.name,
      url: '',
      resourceType: 'StructureDefinition',
      version: '1.0.0',
      date: this.getCurrentDate(),
      kind: 'resource',
      abstract: true,
      snapshot: {
        element: [
          {
            id: '',
            path: '',
            definition: '',
            base: {
              path: '',
              min: 0,
              max: '*',
            },
          },
          {
            id: 'id',
            path: '',
            definition: '',
            base: {
              path: '',
              min: 0,
              max: '1',
            },
              type:[{
                code:"string"
              }]
          },
        ],
      },
    };
  }

  show(): void {
    this.modal.show();
  }
  close(): void {
    this.modal.hide();
  }
  save(): void {
    const self = this;
    self.structureDefinition.name = self.structureDefinition.type;
    // console.log(self.structureDefinition);
    // self.structureDefinition.snapshot.element[0] = {
    //   id: self.structureDefinition.type,
    //   path: self.structureDefinition.type,
    //   definition: self.structureDefinition.type,
    //   max: '*',
    //   min: 1,
    //   base: {
    //     path: self.structureDefinition.type,
    //     min: 0,
    //     max: '*',
    //   },
    // };

    // console.log(self.structureDefinition);
    self._structureDefinitionService.createStructureDefinition(self.structureDefinition).subscribe(() => {
      self.notify.success(self.l('SuccessfullyAdded'));
      self.saving = false;
      self.close();
      self.modalSave.emit(null);
    });
  }

  getCurrentDate(): string {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
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
}
