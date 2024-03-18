using Microsoft.Extensions.Configuration;

namespace Delta.SmartHospital.Configuration
{
    public interface IAppConfigurationAccessor
    {
        IConfigurationRoot Configuration { get; }
    }
}
