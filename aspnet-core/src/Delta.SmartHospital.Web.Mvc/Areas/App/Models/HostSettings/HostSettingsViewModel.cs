using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Delta.SmartHospital.Configuration.Host.Dto;
using Delta.SmartHospital.Editions.Dto;

namespace Delta.SmartHospital.Web.Areas.App.Models.HostSettings
{
    public class HostSettingsViewModel
    {
        public HostSettingsEditDto Settings { get; set; }

        public List<SubscribableEditionComboboxItemDto> EditionItems { get; set; }

        public List<ComboboxItemDto> TimezoneItems { get; set; }

        public List<string> EnabledSocialLoginSettings { get; set; } = new List<string>();
    }
}