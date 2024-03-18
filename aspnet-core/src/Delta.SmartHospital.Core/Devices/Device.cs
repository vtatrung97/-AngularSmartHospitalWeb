using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.Devices
{
    public class Device : FullAuditedEntity<int>, IMustHaveTenant
    {
        public string Status { get; set; }
        public string Manufacturer { get; set; }
        public DateTime ManufactureDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string LotNumber { get; set; }
        public string SerialNumber { get; set; }
        public string ModelNumber { get; set; }
        public string PartNumber { get; set; }
        public int TenantId { get; set; }
        public int? ParentId { get; set; }
        public string Location { get; set; }
    }
}
