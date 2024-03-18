using System.Collections.Generic;
using MvvmHelpers;
using Delta.SmartHospital.Models.NavigationMenu;

namespace Delta.SmartHospital.Services.Navigation
{
    public interface IMenuProvider
    {
        ObservableRangeCollection<NavigationMenuItem> GetAuthorizedMenuItems(Dictionary<string, string> grantedPermissions);
    }
}