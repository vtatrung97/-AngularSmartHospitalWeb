using Abp.Modules;
using Abp.Reflection.Extensions;

namespace Delta.SmartHospital
{
    public class SmartHospitalCoreSharedModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SmartHospitalCoreSharedModule).GetAssembly());
        }
    }
}