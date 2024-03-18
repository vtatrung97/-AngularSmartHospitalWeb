using Abp.Domain.Services;

namespace Delta.SmartHospital
{
    public abstract class SmartHospitalDomainServiceBase : DomainService
    {
        /* Add your common members for all your domain services. */

        protected SmartHospitalDomainServiceBase()
        {
            LocalizationSourceName = SmartHospitalConsts.LocalizationSourceName;
        }
    }
}
