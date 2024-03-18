using System.ComponentModel.DataAnnotations;

namespace Delta.SmartHospital.Web.Models.Account
{
    public class SendPasswordResetLinkViewModel
    {
        [Required]
        public string EmailAddress { get; set; }
    }
}