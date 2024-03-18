﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Delta.SmartHospital.Web.Areas.App.Models.Layout;
using Delta.SmartHospital.Web.Session;
using Delta.SmartHospital.Web.Views;

namespace Delta.SmartHospital.Web.Areas.App.Views.Shared.Themes.Theme8.Components.AppTheme8Brand
{
    public class AppTheme8BrandViewComponent : SmartHospitalViewComponent
    {
        private readonly IPerRequestSessionCache _sessionCache;

        public AppTheme8BrandViewComponent(IPerRequestSessionCache sessionCache)
        {
            _sessionCache = sessionCache;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var headerModel = new HeaderViewModel
            {
                LoginInformations = await _sessionCache.GetCurrentLoginInformationsAsync()
            };

            return View(headerModel);
        }
    }
}
