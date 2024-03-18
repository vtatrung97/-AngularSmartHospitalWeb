using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.FhirResources
{
    public class RefData:Entity<int>
    {
        public string Name { get; set; }
        public string RelativeReference { get; set; }
        public string Url { get; set; }
        public string UrlHash { get; set; }
        public string Version { get; set; }
        public int FhirResourceId { get; set; }
        public FhirResource FhirResource { get; set; }
    }
}
