import { AfterViewInit, Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'detail-grid',
    templateUrl: './detail-grid.component.html',
    styleUrls: ['./detail-grid.component.less']
})
export class DetailGridComponent extends AppComponentBase implements AfterViewInit {
    constructor(injector:Injector) { 
        super(injector);
    }
    @Input() concepts: any[];

    ngAfterViewInit(): void {
     }
}
