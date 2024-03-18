using System.Threading.Tasks;
using Abp.Dependency;

namespace Delta.SmartHospital.MultiTenancy.Accounting
{
    public interface IInvoiceNumberGenerator : ITransientDependency
    {
        Task<string> GetNewInvoiceNumber();
    }
}