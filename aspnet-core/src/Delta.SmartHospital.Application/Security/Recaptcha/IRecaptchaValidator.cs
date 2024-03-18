using System.Threading.Tasks;

namespace Delta.SmartHospital.Security.Recaptcha
{
    public interface IRecaptchaValidator
    {
        Task ValidateAsync(string captchaResponse);
    }
}