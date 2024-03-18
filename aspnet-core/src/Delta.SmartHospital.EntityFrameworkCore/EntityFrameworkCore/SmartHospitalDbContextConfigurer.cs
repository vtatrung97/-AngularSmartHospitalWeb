using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace Delta.SmartHospital.EntityFrameworkCore
{
    public static class SmartHospitalDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<SmartHospitalDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<SmartHospitalDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}