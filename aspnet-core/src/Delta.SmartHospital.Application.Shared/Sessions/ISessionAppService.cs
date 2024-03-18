using System.Threading.Tasks;
using Abp.Application.Services;
using Delta.SmartHospital.Sessions.Dto;

namespace Delta.SmartHospital.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();

        Task<UpdateUserSignInTokenOutput> UpdateUserSignInToken();
    }
}
