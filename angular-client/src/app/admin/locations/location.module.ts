import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '../shared/admin-shared.module';
import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { CreateUpdateLocationModalComponent } from './createUpdateLocation/createUpdateLocationModal.component';

@NgModule({
    declarations: [LocationComponent,CreateUpdateLocationModalComponent],
    imports: [  AppSharedModule, AdminSharedModule, LocationRoutingModule ],
})
export class LocationModule {

}