using System.ComponentModel.DataAnnotations;

namespace Delta.SmartHospital.Authorization.Accounts.Dto
{
    public class SendEmailActivationLinkInput
    {
        [Required]
        public string EmailAddress { get; set; }
    }
}