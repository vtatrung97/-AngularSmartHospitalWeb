using Microsoft.Extensions.DependencyInjection;
using Delta.SmartHospital.HealthChecks;

namespace Delta.SmartHospital.Web.HealthCheck
{
    public static class AbpZeroHealthCheck
    {
        public static IHealthChecksBuilder AddAbpZeroHealthCheck(this IServiceCollection services)
        {
            var builder = services.AddHealthChecks();
            builder.AddCheck<SmartHospitalDbContextHealthCheck>("Database Connection");
            builder.AddCheck<SmartHospitalDbContextUsersHealthCheck>("Database Connection with user check");
            builder.AddCheck<CacheHealthCheck>("Cache");

            // add your custom health checks here
            // builder.AddCheck<MyCustomHealthCheck>("my health check");

            return builder;
        }
    }
}
