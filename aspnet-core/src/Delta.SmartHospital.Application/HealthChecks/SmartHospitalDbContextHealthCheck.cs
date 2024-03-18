using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Delta.SmartHospital.EntityFrameworkCore;

namespace Delta.SmartHospital.HealthChecks
{
    public class SmartHospitalDbContextHealthCheck : IHealthCheck
    {
        private readonly DatabaseCheckHelper _checkHelper;

        public SmartHospitalDbContextHealthCheck(DatabaseCheckHelper checkHelper)
        {
            _checkHelper = checkHelper;
        }

        public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = new CancellationToken())
        {
            if (_checkHelper.Exist("db"))
            {
                return Task.FromResult(HealthCheckResult.Healthy("SmartHospitalDbContext connected to database."));
            }

            return Task.FromResult(HealthCheckResult.Unhealthy("SmartHospitalDbContext could not connect to database"));
        }
    }
}
