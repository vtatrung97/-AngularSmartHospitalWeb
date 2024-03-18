import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, Inject, Input, Injector, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { FhirServiceProxy } from 'shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { PublishStatus } from '../../../../shared/fhirModels/valueSets-static';
import { AddIncludeModalComponent } from './addIncludeModal.component';

@Component({
  selector: 'valueSet-detail',
  templateUrl: './valueSetDetail.component.html',
  styleUrls: ['./valueSetDetail.component.less'],
  animations: [appModuleAnimation()],
})
export class ValueSetDetailComponent extends AppComponentBase implements OnInit {
  valueSet: any = { compose: {} };
  publishStatusList = Object.values(PublishStatus);
  saving: boolean = false;
  @ViewChild('addIncludeModal', { static: true }) addIncludeModal: AddIncludeModalComponent;

  constructor(injector: Injector, private activatedRoute: ActivatedRoute, private fhirService: FhirServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAllInfo();
  }

  getAllInfo(): void {
    const self = this;
    self.primengTableHelper.showLoadingIndicator();

    this.activatedRoute.params.subscribe((params: Params) => {
      var id: string = params['id'];
      self.fhirService
        .get(id, 'ValueSet')
        .pipe(finalize(() => self.primengTableHelper.hideLoadingIndicator()))
        .subscribe({
          next: (result: any) => {
            self.valueSet = result;
            self.primengTableHelper.hideLoadingIndicator();
          },
        });
    });
  }
  addInclude(): void {
    const self = this;
    self.addIncludeModal.show();
  }

  onSaveAddInclude(): void {
    const self = this;
    var indclude = self.addIncludeModal.include;
    self.valueSet.compose.include.push(indclude);
    self.fhirService.update(self.valueSet.id, self.valueSet).subscribe(() => {
      self.notify.success(self.l('SuccessfullyUpdated'));
      self.saving = false;
    });
  }
}
