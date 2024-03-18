using System.Threading.Tasks;
using Delta.SmartHospital.Sessions.Dto;

namespace Delta.SmartHospital.Web.Session
{
    public interface IPerRequestSessionCache
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformationsAsync();
    }
}
