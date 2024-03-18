using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.FhirResources
{
    public class TknData:Entity<int>
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string SystemHash { get; set; }
        public string Text { get; set; }
        public int FhirResourceId { get; set; }
        public FhirResource FhirResource { get; set; }
    }
}
