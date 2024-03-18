using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Delta.SmartHospital.StructureDefinitions.Dto;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.StructureDefinitions
{
    public interface IStructureDefinitionAppService: IApplicationService
    {
        Task Create(JObject jInput);
        Task<ListResultDto<StructureDefinitionDto>> GetAll();
        Task<StructureDefinitionDto> Get(int id);
        Task<StructureDefinitionDto> GetByType(string type);
        Task<StructureDefinitionDto> GetByPath(string path);
        Task Update(int id, JObject jInput);
        Task Delete(EntityDto input);
    }
}
