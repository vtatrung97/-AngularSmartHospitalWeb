using Abp.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc;
using Delta.SmartHospital.Authorization;
using Delta.SmartHospital.DashboardCustomization;
using System.Threading.Tasks;
using Delta.SmartHospital.Web.Areas.App.Startup;

namespace Delta.SmartHospital.Web.Areas.App.Controllers
{
    [Area("App")]
    [AbpMvcAuthorize(AppPermissions.Pages_Administration_Host_Dashboard)]
    public class HostDashboardController : CustomizableDashboardControllerBase
    {
        public HostDashboardController(
            DashboardViewConfiguration dashboardViewConfiguration,
            IDashboardCustomizationAppService dashboardCustomizationAppService)
            : base(dashboardViewConfiguration, dashboardCustomizationAppService)
        {

        }

        public async Task<ActionResult> Index()
        {
            return await GetView(SmartHospitalDashboardCustomizationConsts.DashboardNames.DefaultHostDashboard);
        }
    }
}