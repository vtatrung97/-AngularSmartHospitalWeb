using System.Collections.Generic;
using Abp.Localization;
using Delta.SmartHospital.Install.Dto;

namespace Delta.SmartHospital.Web.Models.Install
{
    public class InstallViewModel
    {
        public List<ApplicationLanguage> Languages { get; set; }

        public AppSettingsJsonDto AppSettingsJson { get; set; }
    }
}
