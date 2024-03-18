using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.Foudation
{
    public class DomainResource:Resource
    {
        public Narrative text { get; set; }
        public List<Resource> contained { get; set; }
    }
}
