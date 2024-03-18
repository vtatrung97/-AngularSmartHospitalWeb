import {NgModule} from '@angular/core';
import {AdminSharedModule} from '@app/admin/shared/admin-shared.module';
import {AppSharedModule} from '@app/shared/app-shared.module';
import { AddNewIncludeModalComponent } from './addNewInclude/addNewIncludeModal.component';
import { CreateOrUpdateValueSetModalComponent } from './createOrUpdateValueSetModal.component';
import { ValueSetRoutingModule } from './valueSet-routing.module';
import { ValueSetComponent } from './valueSet.component';

@NgModule({
    declarations: [ValueSetComponent,CreateOrUpdateValueSetModalComponent,AddNewIncludeModalComponent],
    imports: [  AppSharedModule, AdminSharedModule, ValueSetRoutingModule ],
})
export class ValueSetModule {}