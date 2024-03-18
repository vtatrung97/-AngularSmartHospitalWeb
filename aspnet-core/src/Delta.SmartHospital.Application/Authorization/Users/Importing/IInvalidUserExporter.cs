using System.Collections.Generic;
using Delta.SmartHospital.Authorization.Users.Importing.Dto;
using Delta.SmartHospital.Dto;

namespace Delta.SmartHospital.Authorization.Users.Importing
{
    public interface IInvalidUserExporter
    {
        FileDto ExportToFile(List<ImportUserDto> userListDtos);
    }
}
