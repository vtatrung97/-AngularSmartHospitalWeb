import { Component, EventEmitter, Injector, OnInit, Output, ViewChild, enableProdMode } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PatientServiceProxy } from '@shared/service-proxies/patientService-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { DxButtonModule } from 'devextreme-angular';


import { BrowserModule } from '@angular/platform-browser';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxTabsModule, DxSelectBoxModule } from 'devextreme-angular';


import { DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import 'devextreme/data/odata/store';

@Component({
  selector: 'createOrUpdatePatientModal',
  templateUrl: './createOrUpdatePatientModal.component.html',
  styleUrls: ['./createOrUpdatePatientModal.component.less'],
})
export class CreateOrUpdatePatientModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  saving:boolean=false;
  structureDefinition:any={};

  /**/ 

  dataSource: any;

  /**/ 

  genders: any[];
  gender: any;
  dateofbirth: any;
  value6: any;

  patient:any={
    active:true,
    resourceType:"Patient",
    name:[
      {
        use:'official',
        family:'',
        given:[],
    }
    ]
  };
  constructor(injector: Injector,private patientService:PatientServiceProxy) {
    super(injector);
    this.genders = [
      { name:"Nam", code:"male" },
      { name:"Nữ", code:"female" },
      { name:"Không xác định", code:"unknown" }
    ];

    /**/ 
  
    this.dataSource = {
      store: {
        type: 'odata',
        key: 'Task_ID',
        url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
      },
      expand: 'ResponsibleEmployee',
      select: [
        'Task_ID',
        'Task_Subject',
        'Task_Status'
      ]
    }
      

    /**/ 

  }

  ngOnInit(): void {

  }

  init():void{
    this.patient={
      active:true,
      resourceType:"Patient",
      name:[
        {
          use:'official',
          family:'',
          given:[],
        }
      ]
     };
  }

  onShown(): void {}

  show(): void {
    this.modal.show();
  }

  // getStructureDefinition(structureDefinition:any):void{
  //   this.structureDefinition=structureDefinition;
  //   this.genders=structureDefinition.snapshot.element.filter(x=>x.path==='Patient.gender')[0].code;
  //   console.log(this.structureDefinition);
  // }


  close(): void {
    this.modal.hide();
  }

  save():void{
    const self=this;
    self.patientService.createPatient(self.patient).subscribe(() => {
      self.notify.success(self.l('SuccessfullyAdded'));
      self.saving = false;
      self.close();
      self.modalSave.emit(null);
    });
  }
  
}
