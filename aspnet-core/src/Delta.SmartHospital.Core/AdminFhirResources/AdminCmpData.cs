using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.AdminFhirResources
{
    public class AdminCmpData:Entity<int>
    {
        public int FhirResourceId { get; set; }
        [ForeignKey("FhirResourceId")]
        public AdminFhirResource FhirResource { get; set; }
        public string RelativeReference { get; set; }
    }
}
