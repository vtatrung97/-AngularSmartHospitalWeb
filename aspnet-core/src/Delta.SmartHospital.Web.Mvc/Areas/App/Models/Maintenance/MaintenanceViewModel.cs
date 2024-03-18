using System.Collections.Generic;
using Delta.SmartHospital.Caching.Dto;

namespace Delta.SmartHospital.Web.Areas.App.Models.Maintenance
{
    public class MaintenanceViewModel
    {
        public IReadOnlyList<CacheDto> Caches { get; set; }
    }
}