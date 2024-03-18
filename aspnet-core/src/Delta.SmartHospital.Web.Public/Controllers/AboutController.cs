using Microsoft.AspNetCore.Mvc;
using Delta.SmartHospital.Web.Controllers;

namespace Delta.SmartHospital.Web.Public.Controllers
{
    public class AboutController : SmartHospitalControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}