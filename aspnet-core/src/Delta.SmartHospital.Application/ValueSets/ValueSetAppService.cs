using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Delta.SmartHospital.FhirResources;
using Delta.SmartHospital.ValueSets.Dto;
using Hl7.Fhir.Serialization;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.ValueSets
{
    public class ValueSetAppService : SmartHospitalAppServiceBase, IValueSetAppService
    {
        private readonly IRepository<ValueSet, int> _repository;

        public ValueSetAppService(IRepository<ValueSet, int> repository)
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
                var fhirValueSet = await parser.ParseAsync<Hl7.Fhir.Model.ValueSet>(jsonText);
                fhirValueSet.Id = Guid.NewGuid().ToString();
                fhirValueSet.Date = DateTime.Now.ToString("yyyy-MM-dd");
                fhirValueSet.Publisher = (await UserManager.GetUserByIdAsync(AbpSession.UserId.Value)).FullName;
                FhirJsonSerializer jsonSerializer = new FhirJsonSerializer();
                jsonText = await jsonSerializer.SerializeToStringAsync(fhirValueSet);
                ValueSet valueSet = new ValueSet
                {
                    Name = fhirValueSet.Name,
                    Change = 0,
                    IsCurrent = true,
                    CreationTime = DateTime.Now,
                    Title = fhirValueSet.Title,
                    JsonResource = jsonText,
                    Publisher = fhirValueSet.Publisher,
                    Path = $"ValueSet/{fhirValueSet.Id}",
                    Status = fhirValueSet.Status.Value.ToString(),
                };
                await _repository.InsertAsync(valueSet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Delete(EntityDto input)
        {
            var valueSet = await _repository.GetAsync(input.Id);
            await _repository.DeleteAsync(valueSet);
        }
        public async Task<ValueSetDto> GetByPath(string path)
        {
            var valueSet = (await _repository.FirstOrDefaultAsync(x => x.Path == path && x.IsCurrent==true));

            return ObjectMapper.Map<ValueSetDto>(valueSet);
        }
        public async Task<ValueSetDto> Get(int id)
        {
            var valueSet = (await _repository.GetAsync(id));
            return ObjectMapper.Map<ValueSetDto>(valueSet);
        }

        public async Task<ListResultDto<ValueSetDto>> GetAll()
        {
            var valueSets = await _repository.GetAllListAsync();

            return new ListResultDto<ValueSetDto>
            {
                Items = ObjectMapper.Map<List<ValueSetDto>>(valueSets)
            };
        }

        public async Task Update(int id, JObject jInput)
        {
            try
            {
                dynamic input = jInput;
                string jsonText = Newtonsoft.Json.JsonConvert.SerializeObject(input);
                var parser = new FhirJsonParser();
                var fhirValueSet = await parser.ParseAsync<Hl7.Fhir.Model.ValueSet>(jsonText);
                var exValueSet = await _repository.GetAsync(id);
                exValueSet.JsonResource = jsonText;
                await _repository.UpdateAsync(exValueSet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ValueSetDto> UpdateValueSet(JObject jInput)
        {
            try
            {
                dynamic input = jInput;
                string jsonText = Newtonsoft.Json.JsonConvert.SerializeObject(input);
                var parser = new FhirJsonParser();
                var fhirValueSet = await parser.ParseAsync<Hl7.Fhir.Model.ValueSet>(jsonText);
                ValueSet valueSet = await _repository.FirstOrDefaultAsync(x => x.Path == "ValueSet/" + fhirValueSet.Id);
                if (!string.IsNullOrEmpty(fhirValueSet.Id))
                {
                    valueSet = await _repository.FirstOrDefaultAsync(x => x.Path == "ValueSet/" + fhirValueSet.Id && x.IsCurrent==true);
                }
                if (valueSet != null)
                {
                    valueSet.IsCurrent = false;
                    await _repository.UpdateAsync(valueSet);
                }
                ValueSet newValueSet = new ValueSet
                {
                    Name = fhirValueSet.Name,
                    Change = valueSet != null ? valueSet.Change += 1 : 0,
                    IsCurrent = true,
                    CreationTime = DateTime.Now,
                    Title = fhirValueSet.Title,
                    JsonResource = jsonText,
                    Publisher = fhirValueSet.Publisher,
                    Path = $"ValueSet/{fhirValueSet.Id}",
                    Status = fhirValueSet.Status.Value.ToString(),
                };
                await _repository.InsertAsync(newValueSet);
                return ObjectMapper.Map<ValueSetDto>(newValueSet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
