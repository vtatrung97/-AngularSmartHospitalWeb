using Abp.Auditing;
using Delta.SmartHospital.Configuration.Dto;

namespace Delta.SmartHospital.Configuration.Tenants.Dto
{
    public class TenantEmailSettingsEditDto : EmailSettingsEditDto
    {
        public bool UseHostDefaultEmailSettings { get; set; }
    }
}