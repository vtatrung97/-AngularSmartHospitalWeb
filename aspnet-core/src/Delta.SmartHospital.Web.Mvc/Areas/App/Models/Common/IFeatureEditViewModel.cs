using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Delta.SmartHospital.Editions.Dto;

namespace Delta.SmartHospital.Web.Areas.App.Models.Common
{
    public interface IFeatureEditViewModel
    {
        List<NameValueDto> FeatureValues { get; set; }

        List<FlatFeatureDto> Features { get; set; }
    }
}