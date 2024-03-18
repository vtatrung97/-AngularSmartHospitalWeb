import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
  CodeSystemListDto,
  CodeSystemServiceProxy,
  ListResultDtoOfCodeSystemDto,
} from '@shared/service-proxies/codeSystemService-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'addNewIncludeModal',
  templateUrl: './addNewIncludeModal.component.html',
})
export class AddNewIncludeModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('addNewIncludeModal', { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  saving: boolean = false;
  codeSystems: CodeSystemListDto[];
  selectedCodeSystems: CodeSystemListDto[];

  includes: any[] = [];

  constructor(injector: Injector, private _codeSystemService: CodeSystemServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {}

  show(): void {
    this.modal.show();
  }
  onShown(): void {
    this.init();
  }

  init(): void {
    this.selectedCodeSystems = [];
    this.getCodeSystems();
    this.includes = [];
  }

  getCodeSystems(): void {
    const self = this;
    self._codeSystemService
      .getCodeSystems()
      .pipe(finalize(() => self.primengTableHelper.hideLoadingIndicator()))
      .subscribe({
        next: (result: ListResultDtoOfCodeSystemDto) => {
          self.codeSystems = result.items;
        },
      });
  }

  close(): void {
    this.modal.hide();
  }
  saveIncludes(): void {
    const self = this;
    self.modalSave.emit(null);
    self.close();
  }
  onCodeSystemChange(event): void {
    var codeSystemResource = JSON.parse(event.itemValue.jsonResource);

    var concepts = [];
    codeSystemResource.concept.forEach((element) => {
      var concept = { code: element.code, display: element.display };
      concepts.push(concept);
    });
    var include = {
      system: 'CodeSystem/' + codeSystemResource.id,
      version: codeSystemResource.version,
      concept: concepts
    };
    console.log(include);

    if (this.includes.length > 0) {
      for (var i = 0; i < this.includes.length; i++) {
        if (this.includes[i].system == include.system) {
          this.includes.splice(i, 1);
        } else {
          this.includes.push(include);
        }
      }
    } else {
      this.includes.push(include);
    }

    // var index = this.includes.indexOf(include);
    // alert(index);
    // if (index > -1) {
    //   this.includes.splice(index, 1);
    // } else {
    //   this.includes.push(include);
    // }
  }
}
