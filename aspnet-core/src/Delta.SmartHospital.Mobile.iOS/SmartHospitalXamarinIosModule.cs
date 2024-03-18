using Abp.Modules;
using Abp.Reflection.Extensions;

namespace Delta.SmartHospital
{
    [DependsOn(typeof(SmartHospitalXamarinSharedModule))]
    public class SmartHospitalXamarinIosModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SmartHospitalXamarinIosModule).GetAssembly());
        }
    }
}