using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.AdminFhirResources
{
    public class AdminStrData:Entity<int>
    {
        public string Name { get; set; }
        public string RelativeReference { get; set; }
        public string Url { get; set; }
        public string UrlHash { get; set; }
        public string Version { get; set; }
        public int FhirResourceId { get; set; }
        [ForeignKey("FhirResourceId")]
        public AdminFhirResource FhirResource { get; set; }
    }
}
