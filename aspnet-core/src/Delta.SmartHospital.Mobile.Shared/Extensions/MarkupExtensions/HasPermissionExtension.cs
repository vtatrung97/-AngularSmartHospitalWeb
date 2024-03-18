using System;
using Delta.SmartHospital.Core;
using Delta.SmartHospital.Core.Dependency;
using Delta.SmartHospital.Services.Permission;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Delta.SmartHospital.Extensions.MarkupExtensions
{
    [ContentProperty("Text")]
    public class HasPermissionExtension : IMarkupExtension
    {
        public string Text { get; set; }
        
        public object ProvideValue(IServiceProvider serviceProvider)
        {
            if (ApplicationBootstrapper.AbpBootstrapper == null || Text == null)
            {
                return false;
            }

            var permissionService = DependencyResolver.Resolve<IPermissionService>();
            return permissionService.HasPermission(Text);
        }
    }
}