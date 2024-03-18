using Delta.SmartHospital.MultiTenancy.Payments;

namespace Delta.SmartHospital.Web.Models.Payment
{
    public class CancelPaymentModel
    {
        public string PaymentId { get; set; }

        public SubscriptionPaymentGatewayType Gateway { get; set; }
    }
}