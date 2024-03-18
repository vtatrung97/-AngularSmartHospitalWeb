using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Delta.SmartHospital.Patients;
using Delta.SmartHospital.ServiceRequests.Dto;
using Hl7.Fhir.Serialization;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.ServiceRequests
{
    public class ServiceRequestAppService : SmartHospitalAppServiceBase, IServiceRequestAppService
    {
        private readonly IRepository<ServiceRequest, int> _repository;
        private readonly IRepository<Patient, int> _patientRepository;
        public ServiceRequestAppService(IRepository<ServiceRequest, int> repository, IRepository<Patient, int> patientRepository)
        {
            this._repository = repository;
            this._patientRepository = patientRepository;
        }

        public async Task CreateAsync(JObject jInput)
        {
            try
            {
                dynamic input = jInput;
                string jsonText = Newtonsoft.Json.JsonConvert.SerializeObject(input);
                var parser = new FhirJsonParser();
                var fhirServiceRequest = await parser.ParseAsync<Hl7.Fhir.Model.ServiceRequest>(jsonText);
                fhirServiceRequest.Id = Guid.NewGuid().ToString();
                FhirJsonSerializer jsonSerializer = new FhirJsonSerializer();
                jsonText = await jsonSerializer.SerializeToStringAsync(fhirServiceRequest);
                ServiceRequest serviceRequest = new ServiceRequest
                {
                    JsonResource = jsonText,
                    Code = fhirServiceRequest.Code.Coding[0].Code,
                    DoNotPerform = fhirServiceRequest.DoNotPerform.HasValue ? fhirServiceRequest.DoNotPerform.Value : false,
                    Intent = fhirServiceRequest.Intent.HasValue ? fhirServiceRequest.Intent.Value.ToString() : null,
                    PerformerType = fhirServiceRequest.PerformerType != null ? fhirServiceRequest.PerformerType.Coding[0].Code : null,
                    Priority = fhirServiceRequest.Priority.HasValue ? fhirServiceRequest.Priority.Value.ToString() : null,
                    Subject = fhirServiceRequest.Subject != null ? fhirServiceRequest.Subject.Reference : null,
                    Path = $"ServiceRequest/{fhirServiceRequest.Id}",
                    IsCurrent = true,
                    Status = fhirServiceRequest.Status.Value.ToString(),
                    Text = fhirServiceRequest.Code.Text
                };

                if (fhirServiceRequest.Insurance != null && fhirServiceRequest.Insurance.Count > 0)
                {
                    serviceRequest.Insurance += String.Join(',', fhirServiceRequest.Insurance.Select(x => x.Reference));
                }

                if (fhirServiceRequest.LocationReference != null && fhirServiceRequest.LocationReference.Count > 0)
                {
                    serviceRequest.LocationReference += String.Join(',', fhirServiceRequest.LocationReference.Select(x => x.Reference));
                }

                if (fhirServiceRequest.Performer != null && fhirServiceRequest.Performer.Count > 0)
                {
                    serviceRequest.Performer += String.Join(',', fhirServiceRequest.Performer.Select(x => x.Reference));
                }

                //if (fhirServiceRequest.Identifier != null && fhirServiceRequest.Identifier.Count > 0)
                //{
                //    foreach (var identifier in fhirServiceRequest.Identifier)
                //    {
                //        serviceRequest.Identifiers.ToList().Add(new DataTypes.Identifier
                //        {
                //            System = !String.IsNullOrEmpty(identifier.System) ? identifier.System : String.Empty,
                //            Type = identifier.Type != null ? identifier.Type.Coding[0].Code : String.Empty,
                //            Use = identifier.Use.HasValue ? identifier.Use.Value.ToString() : String.Empty,
                //            Value = !String.IsNullOrEmpty(identifier.Value) ? identifier.Value : String.Empty
                //        });
                //    }
                //}
                Patient patient;
                if (fhirServiceRequest.Subject != null)
                {
                    patient = await _patientRepository.FirstOrDefaultAsync(x => x.ResourceId == fhirServiceRequest.Subject.Reference);
                    if (patient != null)
                    {
                        serviceRequest.Patient = patient.PatientName;
                    }
                    else
                    {
                        if (fhirServiceRequest.Contained != null && fhirServiceRequest.Contained.Count > 0)
                        {
                            foreach (var resourceContain in fhirServiceRequest.Contained)
                            {
                                if (resourceContain.TypeName == "Patient")
                                {
                                    jsonText = jsonSerializer.SerializeToString(resourceContain);
                                    patient = await InsertNewPatient(jsonText);
                                    serviceRequest.Subject = patient.ResourceId;
                                    serviceRequest.Patient = patient.PatientName;
                                }
                            }
                        }
                    }
                }
                
                await _repository.InsertAsync(serviceRequest);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private async Task<Patient> InsertNewPatient(string jsonText)
        {
            var parser = new FhirJsonParser();
            var fhirPatient = await parser.ParseAsync<Hl7.Fhir.Model.Patient>(jsonText);

            fhirPatient.Id = Guid.NewGuid().ToString();
            FhirJsonSerializer jsonSerializer = new FhirJsonSerializer();
            jsonText = await jsonSerializer.SerializeToStringAsync(fhirPatient);
            Patient patient = new Patient
            {
                PatientName = fhirPatient.Name[0].Family + " " + fhirPatient.Name[0].Given.FirstOrDefault(),
                Change = 0,
                IsCurrent = true,
                BirthDate = !string.IsNullOrEmpty(fhirPatient.BirthDate) ? DateTime.Parse(fhirPatient.BirthDate) : DateTime.Parse("1900-01-01"),
                Gender = fhirPatient.Gender.Value.ToString(),
                JsonResource = jsonText,
                ResourceId = fhirPatient.Id
            };
            return (await _patientRepository.InsertAsync(patient));
        }

        public async Task DeleteAsync(EntityDto input)
        {
            var serviceRequest = await _repository.GetAsync(input.Id);
            await _repository.DeleteAsync(serviceRequest);
        }

        public async Task<ListResultDto<ServiceRequestDto>> GetAllAsync(GetAllListInput input)
        {
            var serviceRequests = await _repository.GetAllListAsync(x => x.IsCurrent == true);
            if (!string.IsNullOrEmpty(input.Status))
            {
                serviceRequests = serviceRequests.Where(x => x.Status == input.Status).ToList();
            }
            if (!string.IsNullOrEmpty(input.Intent))
            {
                serviceRequests = serviceRequests.Where(x => x.Intent == input.Intent).ToList();
            }

            return new ListResultDto<ServiceRequestDto>
            {
                Items = ObjectMapper.Map<List<ServiceRequestDto>>(serviceRequests)
            };
        }

        public async Task<ServiceRequestDto> GetAsync(int id)
        {
            var serviceRequest = (await _repository.GetAsync(id));
            return ObjectMapper.Map<ServiceRequestDto>(serviceRequest);
        }

        public Task GetByPathAsync(string path)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateAsync(int id, JObject jInput)
        {
            try
            {
                await this.CreateAsync(jInput);
                dynamic input = jInput;
                var exServiceRequest = await _repository.GetAsync(id);
                exServiceRequest.IsCurrent = false;
                await _repository.UpdateAsync(exServiceRequest);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
