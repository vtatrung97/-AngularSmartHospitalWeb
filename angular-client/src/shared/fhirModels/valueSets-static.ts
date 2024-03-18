export enum PublishStatus {
  Draft = 'draft',
  Active = 'active',
  Retired = 'retired',
  Unknown = 'unknown',
}

export enum CodeSystemHierarchyMeaning {
  GroupedBy = 'grouped-by',
  IsA = 'is-a',
  PartOf = 'part-of',
  ClassifiedWith = 'classified-with',
}

export class NewCodeSystemHierarchyMeaning {
  Code: string;
  Display: string;
  Definition: string;
}

export const CodeSystemHierarchyMeanings: NewCodeSystemHierarchyMeaning[] = [
  {
    Code: 'grouped-by',
    Display: 'Grouped By',
    Definition: 'No particular relationship between the concepts can be assumed, except what can be determined by inspection of the definitions of the elements (possible reasons to use this: importing from a source where this is not defined, or where various parts of the hierarchy have different meanings).',
  },
  {
    Code: 'is-a',
    Display: 'Is-A',
    Definition: 'A hierarchy where the child concepts have an IS-A relationship with the parents - that is, all the properties of the parent are also true for its child concepts. Not that is-a is a property of the concepts, so additional subsumption relationships may be defined using properties or the [subsumes](extension-codesystem-subsumes.html) extension.',
  },
];

export enum StrengthBindingElementList{
  Required ='required',
  Extensible ='extensible',
  Preferred='preferred',
  Example='example'
}

export enum LocationStatus {
  Active = 'active',
  Suspended = 'suspended',
  Inactive = 'inactive'
}