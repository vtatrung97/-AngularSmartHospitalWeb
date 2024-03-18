using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.AdminFhirResources
{
    public class AdminFhirResource: FullAuditedAggregateRoot<int>
    {
        public string ResourceId { get; set; }
        [MaxLength(100)]
        public string ResourceType { get; set; }
        public string ResourceJson { get; set; }
        public string ResourceXml { get; set; }
        public bool IsCurrent { get; set; }
        public string Reference { get; set; }
        [MaxLength(50)]
        public string Version { get; set; }
        public IEnumerable<AdminStrData> StrDatas { get; set; }
        public IEnumerable<AdminDtData> DtDatas { get; set; }
        public IEnumerable<AdminNumData> NumDatas { get; set; }
        public IEnumerable<AdminTknData> TknDatas { get; set; }
        public IEnumerable<AdminRefData> RefDatas { get; set; }
    }
}
