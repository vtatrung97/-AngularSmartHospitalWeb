using Abp.AspNetCore.Mvc.ViewComponents;

namespace Delta.SmartHospital.Web.Views
{
    public abstract class SmartHospitalViewComponent : AbpViewComponent
    {
        protected SmartHospitalViewComponent()
        {
            LocalizationSourceName = SmartHospitalConsts.LocalizationSourceName;
        }
    }
}