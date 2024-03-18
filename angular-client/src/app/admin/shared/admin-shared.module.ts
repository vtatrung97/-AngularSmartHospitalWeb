import {NgModule} from '@angular/core';
import {RoleComboComponent} from '@app/admin/shared/role-combo.component';
import {AppSharedModule} from '@app/shared/app-shared.module';
import {PermissionTreeComponent} from '@app/admin/shared/permission-tree.component';
import {PermissionTreeModalComponent} from '@app/admin/shared/permission-tree-modal.component';
import {PermissionComboComponent} from '@app/admin/shared/permission-combo.component';
import {OrganizationUnitsTreeComponent} from '@app/admin/shared/organization-unit-tree.component';
import {FeatureTreeComponent} from '@app/admin/shared/feature-tree.component';
import {EditionComboComponent} from '@app/admin/shared/edition-combo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TreeModule} from 'primeng/tree';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {CommonModule} from '@angular/common';
import {UtilsModule} from '@shared/utils/utils.module';
import {AppCommonModule} from '@app/shared/common/app-common.module';
import { TableModule } from 'primeng/table';
import { OrderListModule } from 'primeng/orderlist';
import { ButtonModule } from 'primeng/button';
import {DragDropModule} from 'primeng/dragdrop';
import {ContextMenuModule} from 'primeng/contextmenu';
import {PaginatorModule} from 'primeng/paginator';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {EditorModule} from 'primeng/editor';
import {InputMaskModule} from 'primeng/inputmask';
import {CountoModule} from 'angular2-counto';
import {TextMaskModule} from 'angular2-text-mask';
import {ImageCropperModule} from 'ngx-image-cropper';
import {DropdownModule} from 'primeng/dropdown';
import {ListboxModule} from 'primeng/listbox';
import {AppBsModalModule} from '@shared/common/appBsModal/app-bs-modal.module';
import {FileUploadModule} from 'ng2-file-upload';
import {FileUploadModule as PrimeNgFileUploadModule} from 'primeng/fileupload';
import { SubheaderModule } from '@app/shared/common/sub-header/subheader.module';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {TabViewModule} from 'primeng/tabview';
import {ToolbarModule} from 'primeng/toolbar';
import {DividerModule} from 'primeng/divider';
import {MultiSelectModule} from 'primeng/multiselect';
import { DxButtonModule, DxNumberBoxModule } from 'devextreme-angular';

import { DxTabsModule, DxSelectBoxModule,DxTextAreaModule } from 'devextreme-angular';

import { DxDataGridModule, DxTemplateModule,DxFormModule,DxValidationGroupModule,
    DxDropDownBoxModule,DxListModule,DxTextBoxModule,DxToolbarModule } from 'devextreme-angular';
import 'devextreme/data/odata/store';
@NgModule({
    declarations: [
        RoleComboComponent,
        PermissionTreeComponent,
        PermissionTreeModalComponent,
        PermissionComboComponent,
        OrganizationUnitsTreeComponent,
        FeatureTreeComponent,
        EditionComboComponent
    ],
    imports: [
        AppSharedModule,
        ReactiveFormsModule,
        TreeModule,
        TooltipModule,
        FormsModule,
        CommonModule,
        UtilsModule,
        AppCommonModule,
        TableModule,
        OrderListModule,
        ButtonModule,
        TreeModule,
        DragDropModule,
        ContextMenuModule,
        PaginatorModule,
        AutoCompleteModule,
        EditorModule,
        InputMaskModule,
        CountoModule,
        TextMaskModule,
        ImageCropperModule,
        PerfectScrollbarModule,
        DropdownModule,
        AppBsModalModule,
        FileUploadModule,
        PrimeNgFileUploadModule,
        SubheaderModule,
        CardModule,
        TabViewModule,
        DxButtonModule,DxTabsModule,DxTextAreaModule,DxSelectBoxModule,DxDataGridModule,
        DxTemplateModule,DxFormModule,DxValidationGroupModule,DxDropDownBoxModule,DxListModule,
        DxTextBoxModule,DxToolbarModule
    ],
    exports: [
        RoleComboComponent,
        PermissionTreeComponent,
        PermissionTreeModalComponent,
        PermissionComboComponent,
        OrganizationUnitsTreeComponent,
        FeatureTreeComponent,
        EditionComboComponent,
        UtilsModule,
        AppCommonModule,
        TableModule,
        OrderListModule,
        ButtonModule,
        TreeModule,
        DragDropModule,
        ContextMenuModule,
        PaginatorModule,
        AutoCompleteModule,
        EditorModule,
        InputMaskModule,
        CountoModule,
        TextMaskModule,
        ImageCropperModule,
        PerfectScrollbarModule,
        DropdownModule,
        ListboxModule,
        AppBsModalModule,
        AppSharedModule,
        ReactiveFormsModule,
        TreeModule,
        TooltipModule,
        FormsModule,
        CommonModule,
        FileUploadModule,
        PrimeNgFileUploadModule,
        SubheaderModule,
        CardModule,
        CheckboxModule,
        TabViewModule,
        ToolbarModule,
        DividerModule,
        MultiSelectModule,
        DxButtonModule,DxTabsModule,DxSelectBoxModule,DxDataGridModule,DxTemplateModule,DxTemplateModule,
        DxFormModule,DxValidationGroupModule,DxDropDownBoxModule,DxListModule,DxTextBoxModule,DxTextAreaModule,
        DxToolbarModule,DxNumberBoxModule
    ]
})
export class AdminSharedModule {
}
