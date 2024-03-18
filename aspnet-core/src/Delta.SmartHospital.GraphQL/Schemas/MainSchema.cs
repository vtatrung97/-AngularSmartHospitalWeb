using Abp.Dependency;
using GraphQL.Types;
using GraphQL.Utilities;
using Delta.SmartHospital.Queries.Container;
using System;

namespace Delta.SmartHospital.Schemas
{
    public class MainSchema : Schema, ITransientDependency
    {
        public MainSchema(IServiceProvider provider) :
            base(provider)
        {
            Query = provider.GetRequiredService<QueryContainer>();
        }
    }
}