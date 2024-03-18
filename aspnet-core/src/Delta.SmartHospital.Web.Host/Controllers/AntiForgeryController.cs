using Microsoft.AspNetCore.Antiforgery;

namespace Delta.SmartHospital.Web.Controllers
{
    public class AntiForgeryController : SmartHospitalControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
