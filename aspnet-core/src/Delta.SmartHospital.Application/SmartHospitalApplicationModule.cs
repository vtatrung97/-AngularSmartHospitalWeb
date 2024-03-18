using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Delta.SmartHospital.Authorization;

namespace Delta.SmartHospital
{
    /// <summary>
    /// Application layer module of the application.
    /// </summary>
    [DependsOn(
        typeof(SmartHospitalApplicationSharedModule),
        typeof(SmartHospitalCoreModule)
        )]
    public class SmartHospitalApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            //Adding authorization providers
            Configuration.Authorization.Providers.Add<AppAuthorizationProvider>();

            //Adding custom AutoMapper configuration
            Configuration.Modules.AbpAutoMapper().Configurators.Add(CustomDtoMapper.CreateMappings);
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SmartHospitalApplicationModule).GetAssembly());
        }
    }
}