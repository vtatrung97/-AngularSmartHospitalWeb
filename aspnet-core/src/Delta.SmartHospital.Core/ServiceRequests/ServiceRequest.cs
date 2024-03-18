using Abp.Domain.Entities.Auditing;
using Delta.SmartHospital.DataTypes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.ServiceRequests
{
    public class ServiceRequest:FullAuditedEntity<int>
    {
        [Required]
        [MaxLength(50)]
        public string Status { get; set; }
        [Required]
        [MaxLength(50)]
        public string Intent { get; set; }
        [MaxLength(20)]
        public string Priority { get; set; }
        public bool DoNotPerform { get; set; }
        public string Code { get; set; }
        public string Subject { get; set; }
        public string Patient { get; set; }
        public string Text { get; set; }
        public string PerformerType { get; set; }
        public string Performer { get; set; }
        public string LocationReference { get; set; }
        public string Insurance { get; set; }
        public string Specimen { get; set; }
        public IEnumerable<Identifier> Identifiers { get; set; }
        public string Path { get; set; }
        public string JsonResource { get; set; }
        public bool IsCurrent { get; set; }
    }
}
