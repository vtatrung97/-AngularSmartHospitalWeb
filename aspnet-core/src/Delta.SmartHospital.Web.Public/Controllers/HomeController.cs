using Microsoft.AspNetCore.Mvc;
using Delta.SmartHospital.Web.Controllers;

namespace Delta.SmartHospital.Web.Public.Controllers
{
    public class HomeController : SmartHospitalControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}