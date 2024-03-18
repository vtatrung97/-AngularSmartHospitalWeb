import { ContactPoint } from "@shared/fhirModels/fhir-DataTypes";

export class ContactDetail{
    name:string;
    telecom:ContactPoint[];
}