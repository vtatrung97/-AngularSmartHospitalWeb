import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { SettingRoutingModule } from './setting-routing.module';

@NgModule({
    declarations: [],
    imports: [  AppSharedModule, AdminSharedModule,SettingRoutingModule ],
    exports: [],
    providers: [],
})
export class SettingModule {}