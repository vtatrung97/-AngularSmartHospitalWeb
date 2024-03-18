using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Delta.SmartHospital.Authorization.Permissions.Dto;

namespace Delta.SmartHospital.Authorization.Permissions
{
    public interface IPermissionAppService : IApplicationService
    {
        ListResultDto<FlatPermissionWithLevelDto> GetAllPermissions();
    }
}
