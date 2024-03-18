using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.Patients
{
    public class Patient:FullAuditedEntity<int>
    {
        public string PatientName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Gender { get; set; }
        public string ResourceId { get; set; }
        public string JsonResource { get; set; }
        public bool IsCurrent { get; set; }
        public int Change { get; set; }
    }
}
