using Abp.AspNetCore.Mvc.Views;

namespace Delta.SmartHospital.Web.Views
{
    public abstract class SmartHospitalRazorPage<TModel> : AbpRazorPage<TModel>
    {
        protected SmartHospitalRazorPage()
        {
            LocalizationSourceName = SmartHospitalConsts.LocalizationSourceName;
        }
    }
}
