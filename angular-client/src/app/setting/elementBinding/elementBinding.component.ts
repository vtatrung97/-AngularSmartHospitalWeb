import { AfterViewInit, Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'elementBindingModal',
  templateUrl: './elementBindingModal.component.html',
  styleUrls: ['./elementBindingModal.component.less'],
})
export class ElementBindingModalComponent extends AppComponentBase implements OnInit, AfterViewInit {
  constructor(injector: Injector) {
    super(injector);
  }
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  saving:boolean=false;
  ngOnInit(): void {}

  ngAfterViewInit(): void {}
  onShown():void{}
  close():void{}
}
