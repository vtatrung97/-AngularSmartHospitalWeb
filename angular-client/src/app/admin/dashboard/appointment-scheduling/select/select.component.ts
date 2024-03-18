import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
})

export class SelectComponent implements OnInit {

  routes: any[];

  constructor() { 
    this.routes = [
      {name:"Manage Service Types",link:'manage-service-types',icon:'fa fa-calendar'},
      {name:"Manage-Provider-Schedules",link:'manage-provider-schedules',icon:'fa fa-calendar'},
      {name:"Manage-Appointments",link:'manage-appointments',icon:'fa fa-calendar'},
      {name:"Daily-Appointments",link:'daily-appointments',icon:'fa fa-calendar'},
      {name:"Appointment-Requests",link:'appointment-requests',icon:'fa fa-calendar'},
    ]
  }

  ngOnInit(): void {
  }

}
