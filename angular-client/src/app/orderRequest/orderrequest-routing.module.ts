import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderRequestComponent } from './orderRequest.component';

@NgModule({
    declarations: [],
    imports: [  
        RouterModule.forChild([
        {
            path: '',
            component:OrderRequestComponent
        }]) ],
        exports: [
            RouterModule
        ],
    providers: [],
})
export class OrderRequestRoutingModule {}