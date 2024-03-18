import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-appointments',
  templateUrl: './daily-appointments.component.html',
  styleUrls: ['./daily-appointments.component.css']
})
export class DailyAppointmentsComponent implements OnInit {
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
