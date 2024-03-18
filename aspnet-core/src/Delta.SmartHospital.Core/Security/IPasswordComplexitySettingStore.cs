using System.Threading.Tasks;

namespace Delta.SmartHospital.Security
{
    public interface IPasswordComplexitySettingStore
    {
        Task<PasswordComplexitySetting> GetSettingsAsync();
    }
}
