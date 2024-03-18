import { Component, Injector, OnInit } from '@angular/core';
import { FhirServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'app-createValueSet',
    templateUrl: './createValueSet.component.html',
    styleUrls: ['./createValueSet.component.less']
})
export class CreateValueSetComponent extends AppComponentBase  implements OnInit {
    constructor(injector: Injector, private _fhirService: FhirServiceProxy) {
        super(injector);
      }

    ngOnInit(): void { }
}
