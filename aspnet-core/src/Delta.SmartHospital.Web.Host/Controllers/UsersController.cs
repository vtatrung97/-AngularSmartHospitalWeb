using Abp.AspNetCore.Mvc.Authorization;
using Delta.SmartHospital.Authorization;
using Delta.SmartHospital.Storage;
using Abp.BackgroundJobs;

namespace Delta.SmartHospital.Web.Controllers
{
    [AbpMvcAuthorize(AppPermissions.Pages_Administration_Users)]
    public class UsersController : UsersControllerBase
    {
        public UsersController(IBinaryObjectManager binaryObjectManager, IBackgroundJobManager backgroundJobManager)
            : base(binaryObjectManager, backgroundJobManager)
        {
        }
    }
}