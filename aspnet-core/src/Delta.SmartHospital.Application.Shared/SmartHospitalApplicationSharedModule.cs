using Abp.Modules;
using Abp.Reflection.Extensions;

namespace Delta.SmartHospital
{
    [DependsOn(typeof(SmartHospitalCoreSharedModule))]
    public class SmartHospitalApplicationSharedModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SmartHospitalApplicationSharedModule).GetAssembly());
        }
    }
}