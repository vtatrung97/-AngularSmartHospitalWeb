import { ContactDetail } from "@shared/dataTypes/metadataTypes";
import { DateTime } from "luxon";
import { BackboneElement, Identifier } from "./fhir-DataTypes";

export class ValueSet implements IValueSet{
    id:string | undefined;
    url:string|undefined;
    identifier:Identifier[]|undefined;
    version:string|undefined;
    name:string|undefined;
    title:string|undefined;
    status:string|undefined;
    experimental:undefined;
    date:DateTime|undefined;
    publisher:string|undefined;
    contact:ContactDetail[]|undefined;
    description:string|undefined;
    compose:ComposeElement|undefined;
    constructor(data?: IValueSet) {
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
          this.compose = _data['compose'];
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
        data['compose'] = this.compose;
        data['id'] = this.id;
        return data;
      }
}

export interface IValueSet{
    id:string | undefined;
    url:string|undefined;
    identifier:Identifier[]|undefined;
    version:string|undefined;
    name:string|undefined;
    title:string|undefined;
    status:string|undefined;
    experimental:undefined;
    date:DateTime|undefined;
    publisher:string|undefined;
    contact:ContactDetail[]|undefined;
    description:string|undefined;
    compose:ComposeElement|undefined;
}

export class ComposeElement extends BackboneElement{
    lockDate:Date|undefined;
    inactive:boolean|undefined;
    include:IncludeElement[]|undefined;
}

export class IncludeElement extends BackboneElement{
    system:string|undefined;
    version:string|undefined;
    concept:ConceptElement[]|undefined;
}

export class ConceptElement extends BackboneElement{
    code:string|undefined;
    display:string|undefined;
}