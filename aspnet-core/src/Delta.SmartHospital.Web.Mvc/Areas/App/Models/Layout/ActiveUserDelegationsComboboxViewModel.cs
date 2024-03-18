using System.Collections.Generic;
using Delta.SmartHospital.Authorization.Delegation;
using Delta.SmartHospital.Authorization.Users.Delegation.Dto;

namespace Delta.SmartHospital.Web.Areas.App.Models.Layout
{
    public class ActiveUserDelegationsComboboxViewModel
    {
        public IUserDelegationConfiguration UserDelegationConfiguration { get; set; }
        
        public List<UserDelegationDto> UserDelegations { get; set; }
    }
}
