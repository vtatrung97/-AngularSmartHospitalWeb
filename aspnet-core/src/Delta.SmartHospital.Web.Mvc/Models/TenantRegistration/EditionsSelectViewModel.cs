using Abp.AutoMapper;
using Delta.SmartHospital.MultiTenancy.Dto;

namespace Delta.SmartHospital.Web.Models.TenantRegistration
{
    [AutoMapFrom(typeof(EditionsSelectOutput))]
    public class EditionsSelectViewModel : EditionsSelectOutput
    {
    }
}
