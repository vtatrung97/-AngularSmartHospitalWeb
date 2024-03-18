using System.Threading.Tasks;
using Delta.SmartHospital.Authorization.Users;

namespace Delta.SmartHospital.WebHooks
{
    public interface IAppWebhookPublisher
    {
        Task PublishTestWebhook();
    }
}
