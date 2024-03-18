using System.ComponentModel.DataAnnotations;

namespace Delta.SmartHospital.Localization.Dto
{
    public class CreateOrUpdateLanguageInput
    {
        [Required]
        public ApplicationLanguageEditDto Language { get; set; }
    }
}