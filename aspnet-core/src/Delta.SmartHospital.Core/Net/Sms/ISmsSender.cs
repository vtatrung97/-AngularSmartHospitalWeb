using System.Threading.Tasks;

namespace Delta.SmartHospital.Net.Sms
{
    public interface ISmsSender
    {
        Task SendAsync(string number, string message);
    }
}