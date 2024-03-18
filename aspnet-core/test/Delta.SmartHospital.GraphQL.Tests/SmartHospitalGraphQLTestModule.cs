using Abp.Modules;
using Abp.Reflection.Extensions;
using Castle.Windsor.MsDependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Delta.SmartHospital.Configure;
using Delta.SmartHospital.Startup;
using Delta.SmartHospital.Test.Base;

namespace Delta.SmartHospital.GraphQL.Tests
{
    [DependsOn(
        typeof(SmartHospitalGraphQLModule),
        typeof(SmartHospitalTestBaseModule))]
    public class SmartHospitalGraphQLTestModule : AbpModule
    {
        public override void PreInitialize()
        {
            IServiceCollection services = new ServiceCollection();
            
            services.AddAndConfigureGraphQL();

            WindsorRegistrationHelper.CreateServiceProvider(IocManager.IocContainer, services);
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SmartHospitalGraphQLTestModule).GetAssembly());
        }
    }
}