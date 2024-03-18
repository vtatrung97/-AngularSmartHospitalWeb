using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.FhirResources
{
    public class StrData:Entity<int>
    {
        public int FhirResourceId { get; set; }
        public FhirResource FhirResource { get; set; }
        public string Hash { get; set; }
        [MaxLength(150)]
        public string Name { get; set; }
        public string LongString { get; set; }
        public string ShortString { get; set; }
    }
}
