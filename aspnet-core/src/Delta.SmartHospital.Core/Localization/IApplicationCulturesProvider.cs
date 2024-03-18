using System.Globalization;

namespace Delta.SmartHospital.Localization
{
    public interface IApplicationCulturesProvider
    {
        CultureInfo[] GetAllCultures();
    }
}