using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.FhirResources
{
    public class DtData:Entity<int>
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        [MaxLength(150)]
        public string Name { get; set; }
        public int FhirResourceId { get; set; }
        public FhirResource FhirResource { get; set; }
    }
}
