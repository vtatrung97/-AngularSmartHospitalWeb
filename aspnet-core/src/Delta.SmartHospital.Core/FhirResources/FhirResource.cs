using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.FhirResources
{
    public class FhirResource:FullAuditedAggregateRoot<int>
    {
        public string ResourceId { get; set; }
        [MaxLength(100)]
        public string ResourceType { get; set; }
        public int Change { get; set; }
        public bool IsContain { get; set; }
        public bool Contain { get; set; }
        public string ResourceJson { get; set; }
        public string ResourceXml { get; set; }
        public bool IsCurrent { get; set; }
        public string Reference { get; set; }
        [MaxLength(50)]
        public string Version { get; set; }
        public IEnumerable<StrData> StrDatas { get; set; }
        public IEnumerable<DtData> DtDatas { get; set; }
        public IEnumerable<NumData> NumDatas { get; set; }
        public IEnumerable<TknData> TknDatas { get; set; }
        public IEnumerable<RefData> RefDatas { get; set; }
    }
}
