import {NgModule} from '@angular/core';
import {AdminSharedModule} from '@app/admin/shared/admin-shared.module';
import {AppSharedModule} from '@app/shared/app-shared.module';
import { AddIncludeModalComponent } from './addIncludeModal.component';
import { ValueSetDetailRoutingModule } from './valueSetDetail-routing.module';
import { ValueSetDetailComponent } from './valueSetDetail.component';

@NgModule({
    declarations: [ValueSetDetailComponent,AddIncludeModalComponent],
    imports: [  AppSharedModule, AdminSharedModule,ValueSetDetailRoutingModule  ],
})
export class ValueSetDetailModule {}