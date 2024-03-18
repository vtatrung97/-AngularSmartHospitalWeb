import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateValueSetComponent } from './createValueSetPage.component';
import {AdminSharedModule} from '@app/admin/shared/admin-shared.module';
import {AppSharedModule} from '@app/shared/app-shared.module';
import { CreateValueSetRoutingModule } from './createValueSet-routing.module';

@NgModule({
    declarations: [CreateValueSetComponent],
    imports: [ AppSharedModule, AdminSharedModule,CreateValueSetRoutingModule ],
    exports: [],
    providers: [],
})
export class CreateValueSetModule {}