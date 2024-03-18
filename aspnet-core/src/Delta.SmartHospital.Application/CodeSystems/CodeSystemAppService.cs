using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Web.Models;
using Delta.SmartHospital.CodeSystems.Dto;
using Delta.SmartHospital.FhirResources;
using Delta.SmartHospital.Organizations;
using Hl7.Fhir.Serialization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Delta.SmartHospital.CodeSystems
{
    public class CodeSystemAppService : SmartHospitalAppServiceBase, ICodeSystemAppService
    {
        private readonly IRepository<CodeSystem, int> _repository;

        public CodeSystemAppService(IRepository<CodeSystem, int> repository)
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
                var fhirCodeSystem = await parser.ParseAsync<Hl7.Fhir.Model.CodeSystem>(jsonText);
                fhirCodeSystem.Id = Guid.NewGuid().ToString();
                fhirCodeSystem.Date = DateTime.Now.ToString("yyyy-MM-dd");
                fhirCodeSystem.Publisher = (await UserManager.GetUserByIdAsync(AbpSession.UserId.Value)).FullName;
                FhirJsonSerializer jsonSerializer = new FhirJsonSerializer();
                jsonText = await jsonSerializer.SerializeToStringAsync(fhirCodeSystem);
                CodeSystem codeSystem = new CodeSystem
                {
                    Name = fhirCodeSystem.Name,
                    Change = 0,
                    IsCurrent = true,
                    CreationTime = DateTime.Now,
                    Title = fhirCodeSystem.Title,
                    JsonResource = jsonText,
                    Publisher = fhirCodeSystem.Publisher,
                    Path = $"CodeSystem/{fhirCodeSystem.Id}",
                    Status = fhirCodeSystem.Status.Value.ToString(),
                };
                await _repository.InsertAsync(codeSystem);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Delete(EntityDto input)
        {
            var codeSystem = await _repository.GetAsync(input.Id);
            await _repository.DeleteAsync(codeSystem);
        }


        public async Task<CodeSystemDto> Get(int id)
        {
            var codeSystem = (await _repository.GetAsync(id));
            return ObjectMapper.Map<CodeSystemDto>(codeSystem);
        }

        public async Task<ListResultDto<CodeSystemListDto>> GetAll()
        {
            var codeSystems = await _repository.GetAllListAsync();

            return new ListResultDto<CodeSystemListDto>
            {
                Items = ObjectMapper.Map<List<CodeSystemListDto>>(codeSystems)
            };
        }

        public async Task<CodeSystemDto> GetByPath(string path)
        {
            var codeSystem = (await _repository.FirstOrDefaultAsync(x=>x.Path==path));
            return ObjectMapper.Map<CodeSystemDto>(codeSystem);
        }

        public async Task Update(int id, JObject jInput)
        {
            try
            {
                dynamic input = jInput;
                string jsonText = Newtonsoft.Json.JsonConvert.SerializeObject(input);
                var parser = new FhirJsonParser();
                var fhirCodeSystem = await parser.ParseAsync<Hl7.Fhir.Model.CodeSystem>(jsonText);
                var exCodeSystem = await _repository.GetAsync(id);
                exCodeSystem.JsonResource = jsonText;
                await _repository.UpdateAsync(exCodeSystem);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
