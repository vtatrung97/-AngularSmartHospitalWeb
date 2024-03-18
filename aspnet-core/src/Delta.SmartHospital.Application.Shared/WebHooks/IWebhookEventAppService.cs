using System.Threading.Tasks;
using Abp.Webhooks;

namespace Delta.SmartHospital.WebHooks
{
    public interface IWebhookEventAppService
    {
        Task<WebhookEvent> Get(string id);
    }
}
