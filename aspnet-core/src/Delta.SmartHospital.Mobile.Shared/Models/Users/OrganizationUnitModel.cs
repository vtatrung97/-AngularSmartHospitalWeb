using Abp.AutoMapper;
using Delta.SmartHospital.Organizations.Dto;

namespace Delta.SmartHospital.Models.Users
{
    [AutoMapFrom(typeof(OrganizationUnitDto))]
    public class OrganizationUnitModel : OrganizationUnitDto
    {
        public bool IsAssigned { get; set; }
    }
}