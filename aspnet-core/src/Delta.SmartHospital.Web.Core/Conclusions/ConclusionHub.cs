using Abp.AspNetCore.SignalR.Hubs;
using Abp.Dependency;
using Abp.Localization;
using Abp.RealTime;
using Abp.Runtime.Session;
using Castle.Core.Logging;
using Castle.Windsor;
using Delta.SmartHospital.Conclusions;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Delta.SmartHospital.Web.Conclusion
{
    public class ConclusionHub: Hub, ITransientDependency
    {
        public IAbpSession AbpSession { get; set; }

        public ILogger Logger { get; set; }
        public ConclusionHub()
        {
            AbpSession = NullAbpSession.Instance;
            Logger = NullLogger.Instance;
        }

        public async Task SendImage(string text,string connectionId)
        {
            await Clients.Client(connectionId).SendAsync("ReceiveMessage", text);
        }
    }
}
