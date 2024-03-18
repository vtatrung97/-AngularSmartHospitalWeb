using System.Collections.Generic;
using Delta.SmartHospital.Editions;
using Delta.SmartHospital.Editions.Dto;
using Delta.SmartHospital.MultiTenancy.Payments;
using Delta.SmartHospital.MultiTenancy.Payments.Dto;

namespace Delta.SmartHospital.Web.Models.Payment
{
    public class BuyEditionViewModel
    {
        public SubscriptionStartType? SubscriptionStartType { get; set; }

        public EditionSelectDto Edition { get; set; }

        public decimal? AdditionalPrice { get; set; }

        public EditionPaymentType EditionPaymentType { get; set; }

        public List<PaymentGatewayModel> PaymentGateways { get; set; }
    }
}
