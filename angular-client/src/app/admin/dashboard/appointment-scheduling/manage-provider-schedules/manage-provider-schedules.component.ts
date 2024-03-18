import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-provider-schedules',
  templateUrl: './manage-provider-schedules.component.html',
  styleUrls: ['./manage-provider-schedules.component.css']
})
export class ManageProviderSchedulesComponent implements OnInit {
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
