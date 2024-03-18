using Abp.Authorization;
using Delta.SmartHospital.Authorization.Roles;
using Delta.SmartHospital.Authorization.Users;

namespace Delta.SmartHospital.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {

        }
    }
}
