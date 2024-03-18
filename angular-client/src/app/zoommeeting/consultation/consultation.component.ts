import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-consultation',
    templateUrl: './consultation.component.html',
    styleUrls: ['./consultation.component.less']
})
export class ConsultationComponent implements OnInit {
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

    ngOnInit(): void { }
    createConsultation(): void {
        alert("trung")
    }
}
