using System.Threading.Tasks;
using Abp.Application.Services;
using Delta.SmartHospital.Configuration.Host.Dto;

namespace Delta.SmartHospital.Configuration.Host
{
    public interface IHostSettingsAppService : IApplicationService
    {
        Task<HostSettingsEditDto> GetAllSettings();

        Task UpdateAllSettings(HostSettingsEditDto input);

        Task SendTestEmail(SendTestEmailInput input);
    }
}
