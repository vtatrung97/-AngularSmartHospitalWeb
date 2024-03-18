using Abp.Configuration;

namespace Delta.SmartHospital.Timing.Dto
{
    public class GetTimezonesInput
    {
        public SettingScopes DefaultTimezoneScope { get; set; }
    }
}
