import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-patient-record',
  templateUrl: './find-patient-record.component.html',
  styleUrls: ['./find-patient-record.component.css']
})
export class FindPatientRecordComponent implements OnInit {
  dataSource: any;

  constructor() { 
    
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
  }

  ngOnInit(): void {
  }

}
