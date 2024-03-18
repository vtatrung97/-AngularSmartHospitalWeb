using System.Threading.Tasks;
using Abp.Application.Services;
using Delta.SmartHospital.Install.Dto;

namespace Delta.SmartHospital.Install
{
    public interface IInstallAppService : IApplicationService
    {
        Task Setup(InstallDto input);

        AppSettingsJsonDto GetAppSettingsJson();

        CheckDatabaseOutput CheckDatabase();
    }
}