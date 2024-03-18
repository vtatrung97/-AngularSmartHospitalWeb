using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Delta.SmartHospital.CodeSystems.Dto;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.FhirResources
{
    public interface ICodeSystemAppService: IApplicationService
    {
        Task Create(JObject jInput);
        Task<ListResultDto<CodeSystemListDto>> GetAll();
        Task<CodeSystemDto> Get(int id);
        Task<CodeSystemDto> GetByPath(string path);
        Task Update(int id, JObject jInput);
        Task Delete(EntityDto input);
    }
}
