using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;

namespace Delta.SmartHospital
{
    [DependsOn(typeof(SmartHospitalClientModule), typeof(AbpAutoMapperModule))]
    public class SmartHospitalXamarinSharedModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Localization.IsEnabled = false;
            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SmartHospitalXamarinSharedModule).GetAssembly());
        }
    }
}