using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Delta.SmartHospital.StructureDefinitions.Dto;
using Hl7.Fhir.Serialization;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.StructureDefinitions
{
    public class StructureDefinitionAppService : SmartHospitalAppServiceBase, IStructureDefinitionAppService
    {
        private readonly IRepository<StructureDefinition, int> _repository;

        public StructureDefinitionAppService(IRepository<StructureDefinition, int> repository)
        {
            _repository = repository;
        }

        public async Task Create(JObject jInput)
        {
            try
            {
                dynamic input = jInput;
                string jsonText = Newtonsoft.Json.JsonConvert.SerializeObject(input);
                var parser = new FhirJsonParser();
                var fhirStructureDefinition = await parser.ParseAsync<Hl7.Fhir.Model.StructureDefinition>(jsonText);
                fhirStructureDefinition.Id = Guid.NewGuid().ToString();
                fhirStructureDefinition.Date = DateTime.Now.ToString("yyyy-MM-dd");
                fhirStructureDefinition.Publisher = (await UserManager.GetUserByIdAsync(AbpSession.UserId.Value)).FullName;
                FhirJsonSerializer jsonSerializer = new FhirJsonSerializer();
                jsonText = await jsonSerializer.SerializeToStringAsync(fhirStructureDefinition);
                StructureDefinition structureDefinition = new StructureDefinition
                {
                    Name = fhirStructureDefinition.Name,
                    Change = 0,
                    IsCurrent = true,
                    CreationTime = DateTime.Now,
                    Title = fhirStructureDefinition.Title,
                    Kind= fhirStructureDefinition.Kind.Value.ToString(),
                    JsonResource = jsonText,
                    Type=fhirStructureDefinition.Type,
                    Publisher = fhirStructureDefinition.Publisher,
                    Path = $"StructureDefinition/{fhirStructureDefinition.Id}",
                    Status = fhirStructureDefinition.Status.Value.ToString(),
                };
                await _repository.InsertAsync(structureDefinition);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Delete(EntityDto input)
        {
            var structureDefinition = await _repository.GetAsync(input.Id);
            await _repository.DeleteAsync(structureDefinition);
        }

        public async Task<StructureDefinitionDto> Get(int id)
        {
            var structureDefinition = (await _repository.GetAsync(id));
            return ObjectMapper.Map<StructureDefinitionDto>(structureDefinition);
        }

        public async Task<ListResultDto<StructureDefinitionDto>> GetAll()
        {
            var structureDefinitions = await _repository.GetAllListAsync();

            return new ListResultDto<StructureDefinitionDto>
            {
                Items = ObjectMapper.Map<List<StructureDefinitionDto>>(structureDefinitions)
            };
        }

        public async Task<StructureDefinitionDto> GetByPath(string path)
        {
            var structureDefinition = (await _repository.FirstOrDefaultAsync(x => x.Path == path));

            return ObjectMapper.Map<StructureDefinitionDto>(structureDefinition);
        }

        public async Task<StructureDefinitionDto> GetByType(string type)
        {
            var structureDefinition = (await _repository.FirstOrDefaultAsync(x=>x.Type==type));

            return ObjectMapper.Map<StructureDefinitionDto>(structureDefinition);
        }

        public async Task Update(int id, JObject jInput)
        {
            try
            {
                dynamic input = jInput;
                string jsonText = Newtonsoft.Json.JsonConvert.SerializeObject(input);
                var parser = new FhirJsonParser();
                var fhirStructureDefinition = await parser.ParseAsync<Hl7.Fhir.Model.StructureDefinition>(jsonText);
                var exStructureDefinition = await _repository.GetAsync(id);
                exStructureDefinition.JsonResource = jsonText;
                await _repository.UpdateAsync(exStructureDefinition);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
