using System.Threading.Tasks;
using Abp.Application.Services;
using Delta.SmartHospital.Editions.Dto;
using Delta.SmartHospital.MultiTenancy.Dto;

namespace Delta.SmartHospital.MultiTenancy
{
    public interface ITenantRegistrationAppService: IApplicationService
    {
        Task<RegisterTenantOutput> RegisterTenant(RegisterTenantInput input);

        Task<EditionsSelectOutput> GetEditionsForSelect();

        Task<EditionSelectDto> GetEdition(int editionId);
    }
}