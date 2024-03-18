using Abp.Configuration;
using Abp.Net.Mail;
using Abp.Net.Mail.Smtp;
using Abp.Runtime.Security;

namespace Delta.SmartHospital.Net.Emailing
{
    public class SmartHospitalSmtpEmailSenderConfiguration : SmtpEmailSenderConfiguration
    {
        public SmartHospitalSmtpEmailSenderConfiguration(ISettingManager settingManager) : base(settingManager)
        {

        }

        public override string Password => SimpleStringCipher.Instance.Decrypt(GetNotEmptySettingValue(EmailSettingNames.Smtp.Password));
    }
}