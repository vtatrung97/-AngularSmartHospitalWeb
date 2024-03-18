using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Delta.SmartHospital.ServiceRequests.Dto
{
    public class ServiceRequestDto:FullAuditedEntityDto<int>
    {
        [Required]
        [MaxLength(50)]
        public string Status { get; set; }
        [Required]
        [MaxLength(50)]
        public string Intent { get; set; }
        [MaxLength(20)]
        public string Priority { get; set; }
        public bool DoNotPerform { get; set; }
        public string Code { get; set; }
        public string Patient { get; set; }
        public string Text { get; set; }
        public string Subject { get; set; }
        public string PerformerType { get; set; }
        public string Performer { get; set; }
        public string LocationReference { get; set; }
        public string Insurance { get; set; }
        public string Specimen { get; set; }
        public string Path { get; set; }
        public string JsonResource { get; set; }
        public bool IsCurrent { get; set; }
    }
}
