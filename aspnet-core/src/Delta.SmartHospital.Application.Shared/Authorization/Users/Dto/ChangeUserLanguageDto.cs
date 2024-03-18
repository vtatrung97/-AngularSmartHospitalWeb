using System.ComponentModel.DataAnnotations;

namespace Delta.SmartHospital.Authorization.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}
