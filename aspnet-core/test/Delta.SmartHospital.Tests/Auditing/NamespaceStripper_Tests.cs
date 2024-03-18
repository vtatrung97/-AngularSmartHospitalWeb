using Delta.SmartHospital.Auditing;
using Delta.SmartHospital.Test.Base;
using Shouldly;
using Xunit;

namespace Delta.SmartHospital.Tests.Auditing
{
    // ReSharper disable once InconsistentNaming
    public class NamespaceStripper_Tests: AppTestBase
    {
        private readonly INamespaceStripper _namespaceStripper;

        public NamespaceStripper_Tests()
        {
            _namespaceStripper = Resolve<INamespaceStripper>();
        }

        [Fact]
        public void Should_Stripe_Namespace()
        {
            var controllerName = _namespaceStripper.StripNameSpace("Delta.SmartHospital.Web.Controllers.HomeController");
            controllerName.ShouldBe("HomeController");
        }

        [Theory]
        [InlineData("Delta.SmartHospital.Auditing.GenericEntityService`1[[Delta.SmartHospital.Storage.BinaryObject, Delta.SmartHospital.Core, Version=1.10.1.0, Culture=neutral, PublicKeyToken=null]]", "GenericEntityService<BinaryObject>")]
        [InlineData("CompanyName.ProductName.Services.Base.EntityService`6[[CompanyName.ProductName.Entity.Book, CompanyName.ProductName.Core, Version=1.10.1.0, Culture=neutral, PublicKeyToken=null],[CompanyName.ProductName.Services.Dto.Book.CreateInput, N...", "EntityService<Book, CreateInput>")]
        [InlineData("Delta.SmartHospital.Auditing.XEntityService`1[Delta.SmartHospital.Auditing.AService`5[[Delta.SmartHospital.Storage.BinaryObject, Delta.SmartHospital.Core, Version=1.10.1.0, Culture=neutral, PublicKeyToken=null],[Delta.SmartHospital.Storage.TestObject, Delta.SmartHospital.Core, Version=1.10.1.0, Culture=neutral, PublicKeyToken=null],]]", "XEntityService<AService<BinaryObject, TestObject>>")]
        public void Should_Stripe_Generic_Namespace(string serviceName, string result)
        {
            var genericServiceName = _namespaceStripper.StripNameSpace(serviceName);
            genericServiceName.ShouldBe(result);
        }
    }
}
