using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Delta.SmartHospital.Locations.Dto;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.Locations
{
    public interface ILocationAppService : IApplicationService
    {
        Task<ListResultDto<LocationDto>> GetLocations();
        Task<LocationDto> GetLocation(int id);
        Task CreateLocation(JObject jInput);
        Task UpdateLocation(int id, JObject input);
        Task DeleteLocation(EntityDto input);
    }
}
