using Delta.SmartHospital.Editions;
using Delta.SmartHospital.Editions.Dto;
using Delta.SmartHospital.MultiTenancy.Payments;
using Delta.SmartHospital.Security;
using Delta.SmartHospital.MultiTenancy.Payments.Dto;

namespace Delta.SmartHospital.Web.Models.TenantRegistration
{
    public class TenantRegisterViewModel
    {
        public PasswordComplexitySetting PasswordComplexitySetting { get; set; }

        public int? EditionId { get; set; }

        public SubscriptionStartType? SubscriptionStartType { get; set; }

        public EditionSelectDto Edition { get; set; }

        public EditionPaymentType EditionPaymentType { get; set; }
    }
}
