import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-host-dashboard-select',
  templateUrl: './host-dashboard-select.component.html',
})
export class HostDashboardSelectComponent implements OnInit {
  routes: any[];
  constructor() { 

    this.routes = [
      {name:"Find a Patient",link:'find-patient-record',icon:'fa fa-search'},
      {name:"Active Visits",link:'active-visits',icon:'fa fa-calendar'},
      {name:"Register a patient",link:'register-a-patient',icon:'fa fa-user'},
      {name:"Capture Vitals",link:'capture-vitals',icon:'fa fa-heart-pulse'},
      {name:"Appointment Scheduling",link:'appointment-scheduling',icon:'fa fa-calendar'},
      {name:"Reports",link:'reports',icon:'fa fa-list-alt'},
      {name:"Data Management",link:'data-management',icon:'fa fa-hdd'},
      {name:"Configure Metadata",link:'configure-metadata',icon:'fa fa-tasks'},
      {name:"System Administration",link:'system-adminnistration',icon:'fa fa-cogs'},
    ]
  }

  ngOnInit(): void {
  }

}
