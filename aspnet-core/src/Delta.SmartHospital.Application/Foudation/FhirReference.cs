using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.Foudation
{
    public class FhirReference:Element
    {
        public string reference { get; set; }
        public string type { get; set; }
        public string display { get; set; }
    }
}
