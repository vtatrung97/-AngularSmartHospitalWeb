using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.ValueSets
{
    public class ValueSet : FullAuditedEntity<int>
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Path { get; set; }
        public string JsonResource { get; set; }
        public bool IsCurrent { get; set; }
        public int Change { get; set; }
        public string Publisher { get; set; }
    }
}
