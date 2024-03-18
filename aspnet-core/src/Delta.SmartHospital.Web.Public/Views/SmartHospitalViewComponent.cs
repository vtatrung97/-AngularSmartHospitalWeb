using Abp.AspNetCore.Mvc.ViewComponents;

namespace Delta.SmartHospital.Web.Public.Views
{
    public abstract class SmartHospitalViewComponent : AbpViewComponent
    {
        protected SmartHospitalViewComponent()
        {
            LocalizationSourceName = SmartHospitalConsts.LocalizationSourceName;
        }
    }
}