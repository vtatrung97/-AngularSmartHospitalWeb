using Abp.Modules;
using Abp.Reflection.Extensions;

namespace Delta.SmartHospital
{
    [DependsOn(typeof(SmartHospitalXamarinSharedModule))]
    public class SmartHospitalXamarinAndroidModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SmartHospitalXamarinAndroidModule).GetAssembly());
        }
    }
}