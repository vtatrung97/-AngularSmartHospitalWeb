using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.FhirResources
{
    public class NumData:Entity<int>
    {
        [MaxLength(150)]
        public string Name { get; set; }
        public decimal Value { get; set; }
        public int FhirResourceId { get; set; }
        public FhirResource FhirResource { get; set; }
    }
}
