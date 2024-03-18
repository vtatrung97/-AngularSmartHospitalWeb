using Abp.Zero.Ldap.Authentication;
using Abp.Zero.Ldap.Configuration;
using Delta.SmartHospital.Authorization.Users;
using Delta.SmartHospital.MultiTenancy;

namespace Delta.SmartHospital.Authorization.Ldap
{
    public class AppLdapAuthenticationSource : LdapAuthenticationSource<Tenant, User>
    {
        public AppLdapAuthenticationSource(ILdapSettings settings, IAbpZeroLdapModuleConfig ldapModuleConfig)
            : base(settings, ldapModuleConfig)
        {
        }
    }
}