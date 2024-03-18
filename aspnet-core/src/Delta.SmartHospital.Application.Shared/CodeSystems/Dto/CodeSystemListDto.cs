using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Delta.SmartHospital.CodeSystems.Dto
{
    public class CodeSystemListDto: FullAuditedEntityDto<int>
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Path { get; set; }
        public bool IsCurrent { get; set; }
        public int Change { get; set; }
        public string Publisher { get; set; }
        public string JsonResource { get; set; }

    }
}
