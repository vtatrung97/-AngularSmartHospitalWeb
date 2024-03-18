using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Delta.SmartHospital.Patients.Dto;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.Patients
{
    public interface IPatientAppService: IApplicationService
    {
        Task<ListResultDto<PatientListDto>> GetPatients();
        Task<PatientDto> GetPatient(int id);
        Task CreatePatient(JObject input);

        Task UpdatePatient(PatientDto input);

        Task DeletePatient(EntityDto input);
    }
}
