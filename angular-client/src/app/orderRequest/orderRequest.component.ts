import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ListResultDtoOfServiceRequestDto, ServiceRequestServiceProxy } from '@shared/service-proxies/serviceRequestService-proxies';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-orderRequest',
  templateUrl: './orderRequest.component.html',
  styleUrls: ['./orderRequest.component.less'],
})
export class OrderRequestComponent extends AppComponentBase implements OnInit {
  constructor(injector: Injector, private _serviceRequestServiceProxy: ServiceRequestServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders():void{
    var self=this;
    self._serviceRequestServiceProxy.getAll().pipe(finalize(()=>self.primengTableHelper.hideLoadingIndicator()))
    .subscribe({
      next:(result:ListResultDtoOfServiceRequestDto)=>{
        self.primengTableHelper.records=result.items;
        self.primengTableHelper.totalRecordsCount=result.items.length;
        self.primengTableHelper.hideLoadingIndicator();
      }
    })
  }

  createOrder(): void {}
}
