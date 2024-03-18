using Abp.AutoMapper;
using Delta.SmartHospital.MultiTenancy.Dto;

namespace Delta.SmartHospital.Web.Models.TenantRegistration
{
    [AutoMapFrom(typeof(RegisterTenantOutput))]
    public class TenantRegisterResultViewModel : RegisterTenantOutput
    {
        public string TenantLoginAddress { get; set; }
    }
}