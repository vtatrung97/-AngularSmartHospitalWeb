using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Delta.SmartHospital.StructureDefinitions.Dto
{
    public class StructureDefinitionDto:FullAuditedEntityDto<int>
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Path { get; set; }
        public string JsonResource { get; set; }
        public bool IsCurrent { get; set; }
        public int Change { get; set; }
        public string Kind { get; set; }
        public string Type { get; set; }
        public string Publisher { get; set; }
    }
}
