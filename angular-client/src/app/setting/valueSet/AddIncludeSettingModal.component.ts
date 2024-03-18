import { AfterViewInit, Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CodeSystemListDto, CodeSystemServiceProxy } from '@shared/service-proxies/codeSystemService-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'addIncludeSettingModal',
  templateUrl: './addIncludeSettingModal.component.html',
})
export class AddIncludeSettingModalComponent extends AppComponentBase implements OnInit, AfterViewInit {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  saving: boolean = false;
  codeSystems: CodeSystemListDto[];
  codeSystemData: any;
  currentCodeSystem: any = {};
  buttonOptions: any = {
    text: this.l('Save'),
    type: 'success',
    useSubmitBehavior: true,
  };
  constructor(injector: Injector, private _codeSystemServiceProxy: CodeSystemServiceProxy) {
    super(injector);
  }
  onFormSubmit($event): void {}
  onSelectSystemChanged(e): void {
    var self = this;
    var path = e.value;
    var codeSystem = self.codeSystems.filter((x) => x.path == path)[0];
    if (codeSystem != null) {
      self.currentCodeSystem = JSON.parse(codeSystem.jsonResource);
    }
  }
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadCodeSystems();
  }

  loadCodeSystems(): void {
    var self = this;
    self._codeSystemServiceProxy.getCodeSystems().subscribe({
      next: (result) => {
        self.codeSystems = result.items;
      },
    });
  }

  onShown(): void {
    this.init();
  }

  save(e):void{
    var self=this;
    self.close();
    self.modalSave.emit(null);
  }

  init(): void {
    this.currentCodeSystem = {};
  }
  show(): void {
    this.modal.show();
  }
  close(): void {
    this.modal.hide();
  }
}
