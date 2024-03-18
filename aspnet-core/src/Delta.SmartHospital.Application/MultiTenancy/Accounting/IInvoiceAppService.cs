using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Delta.SmartHospital.MultiTenancy.Accounting.Dto;

namespace Delta.SmartHospital.MultiTenancy.Accounting
{
    public interface IInvoiceAppService
    {
        Task<InvoiceDto> GetInvoiceInfo(EntityDto<long> input);

        Task CreateInvoice(CreateInvoiceDto input);
    }
}
