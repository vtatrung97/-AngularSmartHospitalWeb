using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Delta.SmartHospital.Patients.Dto;
using Hl7.Fhir.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.Patients
{
    public class PatientAppService : SmartHospitalAppServiceBase, IPatientAppService
    {
        private readonly IRepository<Patient, int> _patientRepository;
        public PatientAppService(IRepository<Patient, int> patientRepository)
        {
            _patientRepository = patientRepository;
        }

        public async Task CreatePatient(JObject jInput)
        {
            try
            {
                dynamic input = jInput;
                string jsonText = Newtonsoft.Json.JsonConvert.SerializeObject(input);
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
                    BirthDate = !string.IsNullOrEmpty(fhirPatient.BirthDate)?  DateTime.Parse(fhirPatient.BirthDate): DateTime.Parse("1900-01-01"),
                    Gender = fhirPatient.Gender.Value.ToString(),
                    JsonResource = jsonText,
                    ResourceId = fhirPatient.Id
                };
                ////var patient = ObjectMapper.Map<Patient>(input);
                await _patientRepository.InsertAsync(patient);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeletePatient(EntityDto input)
        {
            var patient = ObjectMapper.Map<Patient>(input);
            await _patientRepository.DeleteAsync(patient);
        }

        public async Task<PatientDto> GetPatient(int id)
        {
            var patient = await _patientRepository.GetAsync(id);
            return ObjectMapper.Map<PatientDto>(patient);
        }

        public async Task<ListResultDto<PatientListDto>> GetPatients()
        {
            var patients = await _patientRepository.GetAllListAsync();

            return new ListResultDto<PatientListDto>
            {
                Items = ObjectMapper.Map<List<PatientListDto>>(patients)
            };
        }

        public async Task UpdatePatient(PatientDto input)
        {
            var patient = await _patientRepository.GetAsync(input.Id);
            patient.IsCurrent = input.IsCurrent;
            patient.PatientName = input.PatientName;
            patient.BirthDate = input.BirthDate;
            patient.Gender = input.Gender;
            patient.JsonResource = input.JsonResource;
            await _patientRepository.UpdateAsync(patient);
        }
    }
}
