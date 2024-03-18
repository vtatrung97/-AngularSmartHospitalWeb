import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-meeting',
    templateUrl: './meeting.component.html',
    styleUrls: ['./meeting.component.less']
})
export class MeetingComponent implements OnInit {
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

    createMeeting(): void{
        alert('Hello')
    }
}
