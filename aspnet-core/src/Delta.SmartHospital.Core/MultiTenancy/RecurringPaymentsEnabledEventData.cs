using Abp.Events.Bus;

namespace Delta.SmartHospital.MultiTenancy
{
    public class RecurringPaymentsEnabledEventData : EventData
    {
        public int TenantId { get; set; }
    }
}