import { Component, Injector, OnInit, ViewChild, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PublishStatus } from '@shared/fhirModels/valueSets-static';
import { FhirServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { ElementBindingModalComponent } from './elementBindingModal.component';
import { ElementCodeModalComponent } from './elementCodeModal.component';

@Component({
  selector: 'structureDefinition-detail',
  templateUrl: './structureDefinitionDetail.component.html',
  styleUrls: ['./structureDefinitionDetail.component.less'],
})
export class StructureDefinitionDetailComponent extends AppComponentBase implements OnInit {
  structureDefinition: any = {};
  publishStatusList = Object.values(PublishStatus);
  @ViewChild('elementBindingModal', { static: true }) elementBindingModal: ElementBindingModalComponent;
  @ViewChild('elementCodeModal', { static: true }) elementCodeModal: ElementCodeModalComponent;
  constructor(injector: Injector, private activatedRoute: ActivatedRoute, private fhirService: FhirServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    const self = this;
    self.primengTableHelper.showLoadingIndicator();
    this.activatedRoute.params.subscribe((params: Params) => {
      var id: string = params['id'];
      self.fhirService
        .get(id, 'StructureDefinition')
        .pipe(finalize(() => self.primengTableHelper.hideLoadingIndicator()))
        .subscribe({
          next: (result: any) => {
            self.structureDefinition = result;
            self.primengTableHelper.hideLoadingIndicator();
          },
        });
    });
  }
  addElements(): void {
    this.elementBindingModal.show();
  }

  viewCode(i: number): void {
    const self = this;
    var element = self.structureDefinition.snapshot.element[i];

    self.elementCodeModal.loadelement(element,i);
    self.elementCodeModal.show();
  }

  onSaveElementBinding(): void {
    const self = this;

    var element = self.elementBindingModal.element;
    element.path = self.structureDefinition.type + '.' + element.path;
    self.structureDefinition.snapshot.element.push(element);
    self.fhirService.update(self.structureDefinition.id, self.structureDefinition).subscribe(() => {
      self.notify.success(self.l('SuccessfullyUpdated'));
    });
  }

  onSaveElementCode(): void {
    const self = this;
    var element = self.elementCodeModal.element;
    self.structureDefinition.snapshot.element[self.elementCodeModal.elementIndex]=element;
    self.fhirService.update(self.structureDefinition.id, self.structureDefinition).subscribe(() => {
      self.notify.success(self.l('SuccessfullyUpdated'));
    });
  }
  deleteElement(i:number):void{
    const self=this;
    var element=self.structureDefinition.snapshot.element[i];
    this.message.confirm(
      this.l('ValueSetDeleteWarningMessage', element.path),
      this.l('AreYouSure'),
      isConfirmed => {
          if (isConfirmed) {
            self.fhirService.update(self.structureDefinition.id, self.structureDefinition).subscribe(() => {
            self.structureDefinition.snapshot.element.splice(i, 1);
            });
          }
      }
  );
  }
}
