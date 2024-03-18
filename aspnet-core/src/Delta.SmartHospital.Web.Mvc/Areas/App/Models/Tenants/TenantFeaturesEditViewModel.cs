using Abp.AutoMapper;
using Delta.SmartHospital.MultiTenancy;
using Delta.SmartHospital.MultiTenancy.Dto;
using Delta.SmartHospital.Web.Areas.App.Models.Common;

namespace Delta.SmartHospital.Web.Areas.App.Models.Tenants
{
    [AutoMapFrom(typeof (GetTenantFeaturesEditOutput))]
    public class TenantFeaturesEditViewModel : GetTenantFeaturesEditOutput, IFeatureEditViewModel
    {
        public Tenant Tenant { get; set; }
    }
}