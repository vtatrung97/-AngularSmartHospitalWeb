import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { OrderRequestRoutingModule } from './orderrequest-routing.module';
import { OrderRequestComponent } from './orderRequest.component';

@NgModule({
    declarations: [OrderRequestComponent],
    imports: [  AppSharedModule, AdminSharedModule,OrderRequestRoutingModule ],
    exports: [],
    providers: [],
})
export class OrderRequestModule {}