using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Delta.SmartHospital.ValueSets.Dto;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.ValueSets
{
    public interface IValueSetAppService: IApplicationService
    {
        Task Create(JObject jInput);
        Task<ValueSetDto> UpdateValueSet(JObject jInput);
        Task<ListResultDto<ValueSetDto>> GetAll();
        Task<ValueSetDto> GetByPath(string path);
        Task<ValueSetDto> Get(int id);
        Task Update(int id, JObject jInput);
        Task Delete(EntityDto input);
    }
}
