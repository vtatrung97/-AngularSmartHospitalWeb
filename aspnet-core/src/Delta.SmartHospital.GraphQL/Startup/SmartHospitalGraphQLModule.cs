using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;

namespace Delta.SmartHospital.Startup
{
    [DependsOn(typeof(SmartHospitalCoreModule))]
    public class SmartHospitalGraphQLModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SmartHospitalGraphQLModule).GetAssembly());
        }

        public override void PreInitialize()
        {
            base.PreInitialize();

            //Adding custom AutoMapper configuration
            Configuration.Modules.AbpAutoMapper().Configurators.Add(CustomDtoMapper.CreateMappings);
        }
    }
}