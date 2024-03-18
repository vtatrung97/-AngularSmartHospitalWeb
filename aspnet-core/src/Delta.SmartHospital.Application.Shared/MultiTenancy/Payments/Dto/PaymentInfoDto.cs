using Delta.SmartHospital.Editions.Dto;

namespace Delta.SmartHospital.MultiTenancy.Payments.Dto
{
    public class PaymentInfoDto
    {
        public EditionSelectDto Edition { get; set; }

        public decimal AdditionalPrice { get; set; }

        public bool IsLessThanMinimumUpgradePaymentAmount()
        {
            return AdditionalPrice < SmartHospitalConsts.MinimumUpgradePaymentAmount;
        }
    }
}
