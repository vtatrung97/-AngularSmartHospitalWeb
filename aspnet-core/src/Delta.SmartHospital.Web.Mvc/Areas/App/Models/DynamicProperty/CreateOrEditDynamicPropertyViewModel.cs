using System.Collections.Generic;
using Delta.SmartHospital.DynamicEntityProperties.Dto;

namespace Delta.SmartHospital.Web.Areas.App.Models.DynamicProperty
{
    public class CreateOrEditDynamicPropertyViewModel
    {
        public DynamicPropertyDto DynamicPropertyDto { get; set; }

        public List<string> AllowedInputTypes { get; set; }
    }
}
