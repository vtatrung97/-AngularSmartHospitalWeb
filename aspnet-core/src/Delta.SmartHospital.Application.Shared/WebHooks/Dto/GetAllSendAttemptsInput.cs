using Delta.SmartHospital.Dto;

namespace Delta.SmartHospital.WebHooks.Dto
{
    public class GetAllSendAttemptsInput : PagedInputDto
    {
        public string SubscriptionId { get; set; }
    }
}
