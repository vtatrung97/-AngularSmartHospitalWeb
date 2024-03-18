using Abp.Application.Services.Dto;
using Abp.Webhooks;
using Delta.SmartHospital.WebHooks.Dto;

namespace Delta.SmartHospital.Web.Areas.App.Models.Webhooks
{
    public class CreateOrEditWebhookSubscriptionViewModel
    {
        public WebhookSubscription WebhookSubscription { get; set; }

        public ListResultDto<GetAllAvailableWebhooksOutput> AvailableWebhookEvents { get; set; }
    }
}
