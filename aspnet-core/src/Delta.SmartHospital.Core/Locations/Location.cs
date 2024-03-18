using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.Locations
{
    public class Location : FullAuditedEntity<int>
    {
        public string Status { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Mode { get; set; }
        //site| building | wing | level | room | bed | vehicle | house | cabinet | road | area
        public string PhysicalType { get; set; }
        public int? PartOf { get; set; }
        public string Path { get; set; }
        public string JsonResource { get; set; }
        public bool IsCurrent { get; set; }
        public int Change { get; set; }
    }
}
