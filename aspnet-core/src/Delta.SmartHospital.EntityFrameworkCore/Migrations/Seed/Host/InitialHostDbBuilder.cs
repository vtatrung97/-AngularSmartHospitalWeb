using Delta.SmartHospital.EntityFrameworkCore;

namespace Delta.SmartHospital.Migrations.Seed.Host
{
    public class InitialHostDbBuilder
    {
        private readonly SmartHospitalDbContext _context;

        public InitialHostDbBuilder(SmartHospitalDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            new DefaultEditionCreator(_context).Create();
            new DefaultLanguagesCreator(_context).Create();
            new HostRoleAndUserCreator(_context).Create();
            new DefaultSettingsCreator(_context).Create();

            _context.SaveChanges();
        }
    }
}
