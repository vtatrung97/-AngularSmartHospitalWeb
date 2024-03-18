namespace Delta.SmartHospital.Configuration
{
    public interface IAppConfigurationWriter
    {
        void Write(string key, string value);
    }
}
