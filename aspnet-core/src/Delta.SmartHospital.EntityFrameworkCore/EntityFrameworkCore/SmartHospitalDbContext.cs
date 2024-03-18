using Abp.IdentityServer4vNext;
using Abp.Zero.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Delta.SmartHospital.Authorization.Delegation;
using Delta.SmartHospital.Authorization.Roles;
using Delta.SmartHospital.Authorization.Users;
using Delta.SmartHospital.Chat;
using Delta.SmartHospital.Editions;
using Delta.SmartHospital.Friendships;
using Delta.SmartHospital.MultiTenancy;
using Delta.SmartHospital.MultiTenancy.Accounting;
using Delta.SmartHospital.MultiTenancy.Payments;
using Delta.SmartHospital.Storage;
using Delta.SmartHospital.FhirResources;
using Delta.SmartHospital.AdminFhirResources;
using Delta.SmartHospital.Patients;
using Delta.SmartHospital.CodeSystems;
using Delta.SmartHospital.ValueSets;
using Delta.SmartHospital.StructureDefinitions;
using Delta.SmartHospital.Devices;
using Delta.SmartHospital.Locations;
using Delta.SmartHospital.HealthcareServices;
using Delta.SmartHospital.ServiceRequests;
using Delta.SmartHospital.DataTypes;

namespace Delta.SmartHospital.EntityFrameworkCore
{
    public class SmartHospitalDbContext : AbpZeroDbContext<Tenant, Role, User, SmartHospitalDbContext>, IAbpPersistedGrantDbContext
    {
        /* Define an IDbSet for each entity of the application */

        public virtual DbSet<BinaryObject> BinaryObjects { get; set; }

        public virtual DbSet<Friendship> Friendships { get; set; }

        public virtual DbSet<ChatMessage> ChatMessages { get; set; }

        public virtual DbSet<SubscribableEdition> SubscribableEditions { get; set; }

        public virtual DbSet<SubscriptionPayment> SubscriptionPayments { get; set; }

        public virtual DbSet<Invoice> Invoices { get; set; }

        public virtual DbSet<PersistedGrantEntity> PersistedGrants { get; set; }

        public virtual DbSet<SubscriptionPaymentExtensionData> SubscriptionPaymentExtensionDatas { get; set; }

        public virtual DbSet<UserDelegation> UserDelegations { get; set; }
        public virtual DbSet<FhirResource> FhirResources { get; set; }
        public virtual DbSet<CmpData> CmpDatas { get; set; }
        public virtual DbSet<DtData> DtDatas { get; set; }
        public virtual DbSet<StrData> StrDatas { get; set; }
        public virtual DbSet<TknData> TknDatas { get; set; }
        public virtual DbSet<NumData> NumDatas { get; set; }
        public virtual DbSet<AdminFhirResource> AdminFhirResources { get; set; }
        public virtual DbSet<AdminCmpData> AdminCmpDatas { get; set; }
        public virtual DbSet<AdminDtData> AdminDtDatas { get; set; }
        public virtual DbSet<AdminStrData> AdminStrDatas { get; set; }
        public virtual DbSet<AdminTknData> AdminTknDatas { get; set; }
        public virtual DbSet<AdminNumData> AdminNumDatas { get; set; }
        public virtual DbSet<Patient> Patients { get; set; }
        public virtual DbSet<CodeSystem> CodeSystems { get; set; }
        public virtual DbSet<ValueSet> ValueSets { get; set; }
        public virtual DbSet<StructureDefinition> StructureDefinitions { get; set; }
        public virtual DbSet<Device> Devices { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<HealthcareService> HealthcareServices { get; set; }
        public virtual DbSet<ServiceRequest> ServiceRequests { get; set; }
        public virtual DbSet<Identifier> Identifiers { get; set; }
        public SmartHospitalDbContext(DbContextOptions<SmartHospitalDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<BinaryObject>(b =>
            {
                b.HasIndex(e => new { e.TenantId });
            });

            modelBuilder.Entity<ChatMessage>(b =>
            {
                b.HasIndex(e => new { e.TenantId, e.UserId, e.ReadState });
                b.HasIndex(e => new { e.TenantId, e.TargetUserId, e.ReadState });
                b.HasIndex(e => new { e.TargetTenantId, e.TargetUserId, e.ReadState });
                b.HasIndex(e => new { e.TargetTenantId, e.UserId, e.ReadState });
            });

            modelBuilder.Entity<Friendship>(b =>
            {
                b.HasIndex(e => new { e.TenantId, e.UserId });
                b.HasIndex(e => new { e.TenantId, e.FriendUserId });
                b.HasIndex(e => new { e.FriendTenantId, e.UserId });
                b.HasIndex(e => new { e.FriendTenantId, e.FriendUserId });
            });

            modelBuilder.Entity<Tenant>(b =>
            {
                b.HasIndex(e => new { e.SubscriptionEndDateUtc });
                b.HasIndex(e => new { e.CreationTime });
            });

            modelBuilder.Entity<SubscriptionPayment>(b =>
            {
                b.HasIndex(e => new { e.Status, e.CreationTime });
                b.HasIndex(e => new { PaymentId = e.ExternalPaymentId, e.Gateway });
            });

            modelBuilder.Entity<SubscriptionPaymentExtensionData>(b =>
            {
                b.HasQueryFilter(m => !m.IsDeleted)
                    .HasIndex(e => new { e.SubscriptionPaymentId, e.Key, e.IsDeleted })
                    .IsUnique();
            });

            modelBuilder.Entity<UserDelegation>(b =>
            {
                b.HasIndex(e => new { e.TenantId, e.SourceUserId });
                b.HasIndex(e => new { e.TenantId, e.TargetUserId });
            });

            modelBuilder.ConfigurePersistedGrantEntity();
        }
    }
}
