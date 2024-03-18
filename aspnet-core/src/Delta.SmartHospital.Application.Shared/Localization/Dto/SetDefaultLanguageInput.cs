using System.ComponentModel.DataAnnotations;
using Abp.Localization;

namespace Delta.SmartHospital.Localization.Dto
{
    public class SetDefaultLanguageInput
    {
        [Required]
        [StringLength(ApplicationLanguage.MaxNameLength)]
        public virtual string Name { get; set; }
    }
}