using System.ComponentModel.DataAnnotations;

namespace Delta.SmartHospital.Chat.Dto
{
    public class GetUserChatMessagesInput
    {
        public int? TenantId { get; set; }

        [Range(1, long.MaxValue)]
        public long UserId { get; set; }

        public long? MinMessageId { get; set; }
    }
}