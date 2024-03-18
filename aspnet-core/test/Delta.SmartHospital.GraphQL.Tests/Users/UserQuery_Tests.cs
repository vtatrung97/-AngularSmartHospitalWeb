using System.Threading.Tasks;
using Delta.SmartHospital.Schemas;
using Xunit;

namespace Delta.SmartHospital.GraphQL.Tests.Users
{
    // ReSharper disable once InconsistentNaming
    public class UserQuery_Tests : GraphQLTestBase<MainSchema>
    {
        [Fact]
        public async Task Should_Get_Users()
        {
            LoginAsDefaultTenantAdmin();

            const string query = @"
             query MyQuery {
                users (id:2){
                    totalCount
                    items {
                      name
                      surname

                      roles {
                        id
                        name
                        displayName
                      }

                      organizationUnits {
                        id
                        code
                        displayName
                      }
                    }
                  }
             }";


            const string expectedResult = "{\"users\": {\"totalCount\": 1,\"items\": [{\"name\": \"admin\",\"surname\": \"admin\",\"roles\": [{\"id\": 2,\"name\": \"Admin\",\"displayName\": \"Admin\"}],\"organizationUnits\": []}]}}";

            await AssertQuerySuccessAsync(query, expectedResult);
        }
    }
}
