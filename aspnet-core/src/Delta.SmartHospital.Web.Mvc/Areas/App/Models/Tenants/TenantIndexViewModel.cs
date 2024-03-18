using System.Collections.Generic;
using Delta.SmartHospital.Editions.Dto;

namespace Delta.SmartHospital.Web.Areas.App.Models.Tenants
{
    public class TenantIndexViewModel
    {
        public List<SubscribableEditionComboboxItemDto> EditionItems { get; set; }
    }
}