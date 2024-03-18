using System.Threading.Tasks;
using Delta.SmartHospital.Security.Recaptcha;

namespace Delta.SmartHospital.Test.Base.Web
{
    public class FakeRecaptchaValidator : IRecaptchaValidator
    {
        public Task ValidateAsync(string captchaResponse)
        {
            return Task.CompletedTask;
        }
    }
}
