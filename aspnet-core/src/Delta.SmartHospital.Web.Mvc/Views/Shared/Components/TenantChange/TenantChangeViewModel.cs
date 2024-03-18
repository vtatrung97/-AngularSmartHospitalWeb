using Abp.AutoMapper;
using Delta.SmartHospital.Sessions.Dto;

namespace Delta.SmartHospital.Web.Views.Shared.Components.TenantChange
{
    [AutoMapFrom(typeof(GetCurrentLoginInformationsOutput))]
    public class TenantChangeViewModel
    {
        public TenantLoginInfoDto Tenant { get; set; }
    }
}