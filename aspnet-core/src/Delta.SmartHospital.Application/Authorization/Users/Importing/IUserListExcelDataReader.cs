using System.Collections.Generic;
using Delta.SmartHospital.Authorization.Users.Importing.Dto;
using Abp.Dependency;

namespace Delta.SmartHospital.Authorization.Users.Importing
{
    public interface IUserListExcelDataReader: ITransientDependency
    {
        List<ImportUserDto> GetUsersFromExcel(byte[] fileBytes);
    }
}
