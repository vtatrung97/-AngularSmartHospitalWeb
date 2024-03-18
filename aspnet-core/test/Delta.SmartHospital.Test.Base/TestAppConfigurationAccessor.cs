using Abp.Dependency;
using Abp.Reflection.Extensions;
using Microsoft.Extensions.Configuration;
using Delta.SmartHospital.Configuration;

namespace Delta.SmartHospital.Test.Base
{
    public class TestAppConfigurationAccessor : IAppConfigurationAccessor, ISingletonDependency
    {
        public IConfigurationRoot Configuration { get; }

        public TestAppConfigurationAccessor()
        {
            Configuration = AppConfigurations.Get(
                typeof(SmartHospitalTestBaseModule).GetAssembly().GetDirectoryPathOrNull()
            );
        }
    }
}
