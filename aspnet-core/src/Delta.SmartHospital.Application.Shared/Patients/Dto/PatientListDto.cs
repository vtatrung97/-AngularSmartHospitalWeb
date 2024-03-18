using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Delta.SmartHospital.Patients.Dto
{
    public class PatientListDto:FullAuditedEntityDto<int>
    {
        public string PatientID { get; set; }
        public string PatientName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Gender { get; set; }
        public bool IsCurrent { get; set; }
        public int Change { get; set; }
        public string ResourceId { get; set; }
    }
}
