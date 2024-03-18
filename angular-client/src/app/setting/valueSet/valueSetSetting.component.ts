import { AfterViewInit, Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PublishStatus } from '@shared/fhirModels/valueSets-static';
import { ValueSetServiceProxy } from '@shared/service-proxies/valueSetService-proxies';
import { AddIncludeSettingModalComponent } from './AddIncludeSettingModal.component';

@Component({
  selector: 'valueSetSetting',
  templateUrl: './valueSetSetting.component.html',
  styleUrls: ['./valueSetSetting.component.less'],
})
export class ValueSetSettingComponent extends AppComponentBase implements AfterViewInit, OnInit {
  @Input() valueSet: any;
  @Input() element: any;
  constructor(injector: Injector, private _valueSetServiceProxy: ValueSetServiceProxy) {
    super(injector);
  }
  @ViewChild('addIncludeSettingModal', { static: false })
  addIncludeSettingModal: AddIncludeSettingModalComponent;
  @Output() valueSetSave: EventEmitter<any> = new EventEmitter<any>();
  publishStatusList = Object.values(PublishStatus);

  ngOnInit(): void {}
  ngAfterViewInit(): void {}
  refreshValueSet(): void {
    this.loadValueSet();
  }

  loadValueSet(): void {
    var self = this;
    if (self.valueSet != null) {
      self._valueSetServiceProxy.getValueSetByPath('ValueSet/' + self.valueSet.id).subscribe({
        next: (result) => {
          self.valueSet = JSON.parse(result.jsonResource);
        },
      });
    }
  }
  addInclude(): void {
    this.addIncludeSettingModal.show();
  }

  saveInclude(): void {
    var self = this;
    var newCodeSystem = this.addIncludeSettingModal.currentCodeSystem;
    var include = {
      system: 'CodeSystem/' + newCodeSystem.id,
      concept: [],
    };
    for (var i = 0; i < newCodeSystem.concept.length; i++) {
      var concept = {
        code: newCodeSystem.concept[i].code,
        display: newCodeSystem.concept[i].display,
      };
      include.concept.push(concept);
    }

    self.valueSet.compose.include.push(include);
    self.valueSetSave.emit(self.valueSet);

    self._valueSetServiceProxy.updateValueSet(self.valueSet).subscribe(() => {
      self.notify.success(self.l('SuccessfullyUpdated'));
    });
  }

  onremovingIncludeRow(e): void {
    var self = this;
    var include = e.data;
    var index = self.valueSet.compose.include.indexOf(include);
    self.valueSet.compose.include.splice(index, 1);
    self._valueSetServiceProxy.updateValueSet(self.valueSet).subscribe(() => {
      self.notify.success(self.l('SuccessfullyUpdated'));
    });
  }
  addValueSet(): void {
    var self=this;
    this.valueSet = {
      title: '',
      name:"valueSet-"+ self.element.id,
      status: '',
      resourceType: 'ValueSet',
      compose: {
        include: []
      },
    };
  }
}
