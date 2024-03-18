using System;
using Abp.AutoMapper;
using Delta.SmartHospital.Sessions.Dto;

namespace Delta.SmartHospital.Models.Common
{
    [AutoMapFrom(typeof(ApplicationInfoDto)),
     AutoMapTo(typeof(ApplicationInfoDto))]
    public class ApplicationInfoPersistanceModel
    {
        public string Version { get; set; }

        public DateTime ReleaseDate { get; set; }
    }
}