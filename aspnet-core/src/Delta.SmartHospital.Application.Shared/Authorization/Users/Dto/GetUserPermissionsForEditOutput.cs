using System.Collections.Generic;
using Delta.SmartHospital.Authorization.Permissions.Dto;

namespace Delta.SmartHospital.Authorization.Users.Dto
{
    public class GetUserPermissionsForEditOutput
    {
        public List<FlatPermissionDto> Permissions { get; set; }

        public List<string> GrantedPermissionNames { get; set; }
    }
}