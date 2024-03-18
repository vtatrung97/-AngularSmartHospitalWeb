using Abp.AutoMapper;
using Delta.SmartHospital.Authorization.Roles.Dto;
using Delta.SmartHospital.Web.Areas.App.Models.Common;

namespace Delta.SmartHospital.Web.Areas.App.Models.Roles
{
    [AutoMapFrom(typeof(GetRoleForEditOutput))]
    public class CreateOrEditRoleModalViewModel : GetRoleForEditOutput, IPermissionsEditViewModel
    {
        public bool IsEditMode => Role.Id.HasValue;
    }
}