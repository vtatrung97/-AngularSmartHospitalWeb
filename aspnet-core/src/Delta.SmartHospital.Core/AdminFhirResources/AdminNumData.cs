using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.AdminFhirResources
{
    public class AdminNumData:Entity<int>
    {
        [MaxLength(150)]
        public string Name { get; set; }
        public decimal Value { get; set; }
        public int FhirResourceId { get; set; }
        [ForeignKey("FhirResourceId")]
        public AdminFhirResource FhirResource { get; set; }
    }
}
