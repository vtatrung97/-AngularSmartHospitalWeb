import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ListResultDtoOfPatientDto, PatientServiceProxy } from '@shared/service-proxies/patientService-proxies';
import { FhirServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { CreateOrUpdatePatientModalComponent } from '../createorupdate/createOrUpdatePatientModal.component';

@Component({
  selector: 'patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.less'],
})
export class PatientListComponent extends AppComponentBase implements OnInit {

  dataSource: any;

  selectedPatient: any = {};
  patientStructureDefinition:any={};
  @ViewChild('createOrUpdatePatientModal', {static: true}) createOrUpdatePatientModal: CreateOrUpdatePatientModalComponent;

  constructor(injector: Injector, private fhirService: FhirServiceProxy,private patientService:PatientServiceProxy) {
    super(injector);

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
        'Task_Status',
        'Task_Assigned_Employee_ID',
      ]
    }
  }

  ngOnInit(): void {
    this.loadPatients();
    // this.getStructureDefinition();
  }

  loadPatients(): void {
    var self = this;

    self.patientService.getPatients()
    .pipe(finalize(()=>self.primengTableHelper.hideLoadingIndicator()))
    .subscribe({
      next: (result: ListResultDtoOfPatientDto) => {
        self.primengTableHelper.records = result.items;
        self.primengTableHelper.totalRecordsCount = result.items.length;
        self.primengTableHelper.hideLoadingIndicator();
      },
    });
    // self.fhirService
    //   .read('Patient')
    //   .pipe(finalize(() => self.primengTableHelper.hideLoadingIndicator()))
    //   .subscribe({
    //     next: (result: any) => {
    //       self.primengTableHelper.records = result.filter(self.checkResource);
    //       self.primengTableHelper.totalRecordsCount = result.length;
    //       self.primengTableHelper.hideLoadingIndicator();
    //     },
    //   });
  }

  getStructureDefinition(){
    var self = this;

    this.fhirService.search("StructureDefinition","Patient").pipe(finalize(() => self.primengTableHelper.hideLoadingIndicator())).subscribe({
        next: (result: any) => {
          self.patientStructureDefinition=result[0].resource;
        },
      });
  }

  getDisplay(key,path):string{
    var self = this;
    return '';
  }

  checkResource(resource) {
    return (resource.resourceType = 'Patient');
  }
  createPatient(): void {
    // this.createOrUpdatePatientModal.getStructureDefinition(this.patientStructureDefinition);
    this.createOrUpdatePatientModal.init();
    this.createOrUpdatePatientModal.show();
  }

  onRowSelect($event: EventListener): void {}

  deletePatient(record): void {}

  downloadPatient(record): void {}
}
