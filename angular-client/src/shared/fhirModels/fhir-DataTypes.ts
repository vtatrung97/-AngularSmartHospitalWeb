import { DateTime } from 'luxon';

export class Element {
  id: string;
}

export class Identifier extends Element {
  use: string;
  type: CodeableConcept;
  system: string;
  value: string;
  period: Period;
}

export class CodeableConcept extends Element {
  coding: Coding[];
  text: string;
}

export class Coding extends Element {
  system: string;
  version: string;
  code: string;
  display: string;
  userSelected: boolean;
}

export class Period extends Element {
  start: DateTime;
  end: DateTime;
}

export class ContactPoint extends Element {
  system: string;
  value: string;
  use: string;
  rank: number;
  period: Period;
}

export class Reference extends Element {
  reference: string;
  type: string;
  identifier: Reference;
  display: string;
}

export class Address extends Element {
  use: string;
  type: string;
  text: string;
  line: string[];
  city: string;
  district: string;
  state: string;
  postalCode: string;
  country: string;
  period: Period;
}

export class BackboneElement extends Element {}

export class ElementDefinition extends BackboneElement {
  path: string;
  representation: string;
  sliceName: string;
  sliceIsConstraining: boolean;
  label: string;
  code: Coding[];
  short: string;
  definition: string;
  comment: string;
  requirements: string;
  alias: string[];
  min: number;
  max: string;
  base: BaseElement;
  binding: BindingElement;
  type:ElementType[];
}

export class BaseElement extends Element {
  path: string;
  min: number;
  max: string;
}

export class BindingElement extends Element {
  strength: string;
  description: string;
  valueSet: string;
}

export class ElementType extends BackboneElement{
  code:string;
}