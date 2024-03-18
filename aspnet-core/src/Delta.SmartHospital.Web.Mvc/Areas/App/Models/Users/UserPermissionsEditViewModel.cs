using Abp.AutoMapper;
using Delta.SmartHospital.Authorization.Users;
using Delta.SmartHospital.Authorization.Users.Dto;
using Delta.SmartHospital.Web.Areas.App.Models.Common;

namespace Delta.SmartHospital.Web.Areas.App.Models.Users
{
    [AutoMapFrom(typeof(GetUserPermissionsForEditOutput))]
    public class UserPermissionsEditViewModel : GetUserPermissionsForEditOutput, IPermissionsEditViewModel
    {
        public User User { get; set; }
    }
}