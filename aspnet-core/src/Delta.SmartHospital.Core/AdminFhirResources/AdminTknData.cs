using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.AdminFhirResources
{
    public class AdminTknData:Entity<int>
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string SystemHash { get; set; }
        public string Text { get; set; }
        public int FhirResourceId { get; set; }
        [ForeignKey("FhirResourceId")]
        public AdminFhirResource FhirResource { get; set; }
    }
}
