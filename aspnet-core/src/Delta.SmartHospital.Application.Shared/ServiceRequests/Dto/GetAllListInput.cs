using System;
using System.Collections.Generic;
using System.Text;

namespace Delta.SmartHospital.ServiceRequests.Dto
{
    public class GetAllListInput
    {
        public string Status { get; set; }
        public string Intent { get; set; }
        public string Priority { get; set; }
        public bool DoNotPerform { get; set; }
        public string Code { get; set; }
    }
}
