using System.Collections.Generic;
using System.Threading.Tasks;
using Abp;
using Delta.SmartHospital.Dto;

namespace Delta.SmartHospital.Gdpr
{
    public interface IUserCollectedDataProvider
    {
        Task<List<FileDto>> GetFiles(UserIdentifier user);
    }
}
