using System.Threading.Tasks;
using Abp.Application.Services;
using Delta.SmartHospital.Configuration.Tenants.Dto;

namespace Delta.SmartHospital.Configuration.Tenants
{
    public interface ITenantSettingsAppService : IApplicationService
    {
        Task<TenantSettingsEditDto> GetAllSettings();

        Task UpdateAllSettings(TenantSettingsEditDto input);

        Task ClearLogo();

        Task ClearCustomCss();
    }
}
