using Abp.Application.Services.Dto;
using Delta.SmartHospital.ServiceRequests.Dto;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.ServiceRequests
{
    public interface IServiceRequestAppService
    {
        Task<ListResultDto<ServiceRequestDto>> GetAllAsync(GetAllListInput input);
        Task<ServiceRequestDto> GetAsync(int id);
        Task CreateAsync(JObject jInput);
        Task UpdateAsync(int id, JObject jInput);
        Task DeleteAsync(EntityDto input);
        Task GetByPathAsync(string path);
    }
}
