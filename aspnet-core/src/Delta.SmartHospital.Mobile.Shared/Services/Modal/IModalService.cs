using System.Threading.Tasks;
using Delta.SmartHospital.Views;
using Xamarin.Forms;

namespace Delta.SmartHospital.Services.Modal
{
    public interface IModalService
    {
        Task ShowModalAsync(Page page);

        Task ShowModalAsync<TView>(object navigationParameter) where TView : IXamarinView;

        Task<Page> CloseModalAsync();
    }
}
