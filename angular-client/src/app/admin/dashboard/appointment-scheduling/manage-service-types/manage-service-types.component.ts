import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-service-types',
  templateUrl: './manage-service-types.component.html',
  styleUrls: ['./manage-service-types.component.css']
})
export class ManageServiceTypesComponent implements OnInit {
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
        'Task_Status',
        'Task_Assigned_Employee_ID',
      ]
    }
   }

  ngOnInit(): void {
  }

}
