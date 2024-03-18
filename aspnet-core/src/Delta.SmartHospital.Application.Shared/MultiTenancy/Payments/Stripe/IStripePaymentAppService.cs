using System.Threading.Tasks;
using Abp.Application.Services;
using Delta.SmartHospital.MultiTenancy.Payments.Dto;
using Delta.SmartHospital.MultiTenancy.Payments.Stripe.Dto;

namespace Delta.SmartHospital.MultiTenancy.Payments.Stripe
{
    public interface IStripePaymentAppService : IApplicationService
    {
        Task ConfirmPayment(StripeConfirmPaymentInput input);

        StripeConfigurationDto GetConfiguration();

        Task<SubscriptionPaymentDto> GetPaymentAsync(StripeGetPaymentInput input);

        Task<string> CreatePaymentSession(StripeCreatePaymentSessionInput input);
    }
}