using Abp.Domain.Entities;
using Delta.SmartHospital.ServiceRequests;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.DataTypes
{
    public class Identifier:Entity<int>
    {
        public string Use { get; set; }
        public string Type { get; set; }
        public string System { get; set; }
        public string Value { get; set; }
        public int? ServiceRequestId { get; set; }
        [ForeignKey("ServiceRequestId")]
        public ServiceRequest ServiceRequest { get; set; }
    }
}
