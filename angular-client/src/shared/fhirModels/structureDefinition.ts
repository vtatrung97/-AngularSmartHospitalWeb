import { ContactDetail } from "@shared/dataTypes/metadataTypes";
import { DateTime } from "luxon";
import { BackboneElement, ElementDefinition, Identifier } from "./fhir-DataTypes";

export class StructureDefinition implements IStructureDefinition {
    url:string |undefined;
    identifier:Identifier|undefined;
    version:string|undefined;
    name:string|undefined;
    status:string|undefined;
    title:string|undefined;
    experimental:boolean|undefined;
    date:DateTime|undefined;
    publisher:string|undefined;
    contact:ContactDetail[]|undefined;
    description:string|undefined;
    purpose:string|undefined;
    kind:string|undefined;
    snapshot:SnapshotElement|undefined;
    contain:any[]|undefined;
    id:string|undefined;

    constructor(data?: IStructureDefinition) {
        if (data) {
          for (var property in data) {
            if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
          }
        }
      }

      init(_data?: any) {
        if (_data) {
          this.url = _data['url'];
          this.identifier = _data['identifier'];
          this.version = _data['version'];
          this.name = _data['name'];
          this.status = _data['status'];
          this.title = _data['title'];
          this.experimental = _data['experimental'];
          this.description = _data['description'];
          this.date = _data['date'];
          this.publisher = _data['publisher'];
          this.contact = _data['contact'];
          this.purpose = _data['purpose'];
          this.kind = _data['kind'];
          this.snapshot = _data['snapshot'];
          this.contain = _data['contain'];
          this.id = _data['id'];
        }
      }

      toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['url'] = this.url;
        data['identifier'] = this.identifier;
        data['version'] = this.version;
        data['name'] = this.name;
        data['status'] = this.status;
        data['title'] = this.title;
        data['experimental'] = this.experimental;
        data['description'] = this.description;
        data['date'] = this.date;
        data['publisher'] = this.publisher;
        data['contact'] = this.contact;
        data['publisher'] = this.publisher;
        data['kind'] = this.kind;
        data['snapshot'] = this.snapshot;
        data['contain'] = this.contain;
        data['id'] = this.id;
        return data;
      }
}

export interface IStructureDefinition{
    url:string |undefined;
    identifier:Identifier|undefined;
    version:string|undefined;
    name:string|undefined;
    status:string|undefined;
    title:string|undefined;
    experimental:boolean|undefined;
    date:DateTime|undefined;
    publisher:string|undefined;
    contact:ContactDetail[]|undefined;
    description:string|undefined;
    purpose:string|undefined;
    kind:string|undefined;
    snapshot:SnapshotElement|undefined;
    contain:any[]|undefined;
    id:string|undefined;
} 


export class SnapshotElement extends BackboneElement{
    element:ElementDefinition[];
}

