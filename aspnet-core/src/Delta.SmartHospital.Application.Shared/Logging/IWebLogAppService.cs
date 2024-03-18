using Abp.Application.Services;
using Delta.SmartHospital.Dto;
using Delta.SmartHospital.Logging.Dto;

namespace Delta.SmartHospital.Logging
{
    public interface IWebLogAppService : IApplicationService
    {
        GetLatestWebLogsOutput GetLatestWebLogs();

        FileDto DownloadWebLogs();
    }
}
