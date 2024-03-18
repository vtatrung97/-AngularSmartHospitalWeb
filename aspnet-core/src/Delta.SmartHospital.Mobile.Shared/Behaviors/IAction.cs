using Xamarin.Forms.Internals;

namespace Delta.SmartHospital.Behaviors
{
    [Preserve(AllMembers = true)]
    public interface IAction
    {
        bool Execute(object sender, object parameter);
    }
}