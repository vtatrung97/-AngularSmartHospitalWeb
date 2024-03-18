using Abp.Modules;
using Abp.Reflection.Extensions;

namespace Delta.SmartHospital
{
    public class SmartHospitalClientModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SmartHospitalClientModule).GetAssembly());
        }
    }
}
