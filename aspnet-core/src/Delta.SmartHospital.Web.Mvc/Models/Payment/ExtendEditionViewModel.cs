using System.Collections.Generic;
using Delta.SmartHospital.Editions.Dto;
using Delta.SmartHospital.MultiTenancy.Payments;

namespace Delta.SmartHospital.Web.Models.Payment
{
    public class ExtendEditionViewModel
    {
        public EditionSelectDto Edition { get; set; }

        public List<PaymentGatewayModel> PaymentGateways { get; set; }
    }
}