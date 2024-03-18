using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.FhirResources
{
    public class CmpData:Entity<int>
    {
        public int FhirResourceId { get; set; }
        public FhirResource FhirResource { get; set; }
        public string RelativeReference { get; set; }
    }
}
