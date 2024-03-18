using System.Reflection;
using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace Delta.SmartHospital.Localization
{
    public static class SmartHospitalLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(
                    SmartHospitalConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(SmartHospitalLocalizationConfigurer).GetAssembly(),
                        "Delta.SmartHospital.Localization.SmartHospital"
                    )
                )
            );
        }
    }
}