using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Delta.SmartHospital.Web.Areas.App.Models.Layout;
using Delta.SmartHospital.Web.Session;
using Delta.SmartHospital.Web.Views;

namespace Delta.SmartHospital.Web.Areas.App.Views.Shared.Themes.Theme4.Components.AppTheme4Footer
{
    public class AppTheme4FooterViewComponent : SmartHospitalViewComponent
    {
        private readonly IPerRequestSessionCache _sessionCache;

        public AppTheme4FooterViewComponent(IPerRequestSessionCache sessionCache)
        {
            _sessionCache = sessionCache;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var footerModel = new FooterViewModel
            {
                LoginInformations = await _sessionCache.GetCurrentLoginInformationsAsync()
            };

            return View(footerModel);
        }
    }
}
