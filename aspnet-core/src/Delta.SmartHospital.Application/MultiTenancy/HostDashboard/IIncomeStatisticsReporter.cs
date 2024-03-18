using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Delta.SmartHospital.MultiTenancy.HostDashboard.Dto;

namespace Delta.SmartHospital.MultiTenancy.HostDashboard
{
    public interface IIncomeStatisticsService
    {
        Task<List<IncomeStastistic>> GetIncomeStatisticsData(DateTime startDate, DateTime endDate,
            ChartDateInterval dateInterval);
    }
}