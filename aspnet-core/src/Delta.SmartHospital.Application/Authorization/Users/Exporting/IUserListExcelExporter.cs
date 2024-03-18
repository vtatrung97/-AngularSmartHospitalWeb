using System.Collections.Generic;
using Delta.SmartHospital.Authorization.Users.Dto;
using Delta.SmartHospital.Dto;

namespace Delta.SmartHospital.Authorization.Users.Exporting
{
    public interface IUserListExcelExporter
    {
        FileDto ExportToFile(List<UserListDto> userListDtos);
    }
}