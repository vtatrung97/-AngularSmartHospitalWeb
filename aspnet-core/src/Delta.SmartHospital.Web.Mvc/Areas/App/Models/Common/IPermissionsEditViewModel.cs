using System.Collections.Generic;
using Delta.SmartHospital.Authorization.Permissions.Dto;

namespace Delta.SmartHospital.Web.Areas.App.Models.Common
{
    public interface IPermissionsEditViewModel
    {
        List<FlatPermissionDto> Permissions { get; set; }

        List<string> GrantedPermissionNames { get; set; }
    }
}