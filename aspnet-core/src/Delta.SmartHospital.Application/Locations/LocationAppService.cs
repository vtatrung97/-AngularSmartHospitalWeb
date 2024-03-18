using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Delta.SmartHospital.Locations.Dto;
using Hl7.Fhir.Serialization;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delta.SmartHospital.Locations
{
    public class LocationAppService : SmartHospitalAppServiceBase, ILocationAppService
    {
        private readonly IRepository<Location, int> _locationRepository;
        public LocationAppService(IRepository<Location, int> locationRepository)
        {
            _locationRepository = locationRepository;
        }
        public async Task CreateLocation(JObject jInput)
        {
            try
            {
                dynamic input = jInput;
                string jsonText = Newtonsoft.Json.JsonConvert.SerializeObject(input);
                var parser = new FhirJsonParser();
                var fhirLocation = await parser.ParseAsync<Hl7.Fhir.Model.Location>(jsonText);
                fhirLocation.Id = Guid.NewGuid().ToString();
                FhirJsonSerializer jsonSerializer = new FhirJsonSerializer();
                jsonText = await jsonSerializer.SerializeToStringAsync(fhirLocation);
                Location location = new Location
                {
                    Name = fhirLocation.Name,
                    Change = 0,
                    IsCurrent = true,
                    CreationTime = DateTime.Now,
                    Description = fhirLocation.Description,
                    Mode = fhirLocation.Mode.Value.ToString(),
                    PhysicalType = fhirLocation.PhysicalType.Text,
                    JsonResource = jsonText,
                    Path = $"Location/{fhirLocation.Id}",
                    Status = fhirLocation.Status.Value.ToString()
                };
                //if(fhirLocation.PartOf !=null)
                //{
                //    location.PartOf = (await _locationRepository.FirstOrDefaultAsync(x => x.Path == fhirLocation.PartOf.Url.Host)).Id;
                //}
                await _locationRepository.InsertAsync(location);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteLocation(EntityDto input)
        {
            var location = await _locationRepository.GetAsync(input.Id);
            await _locationRepository.DeleteAsync(location);
        }

        public async Task<LocationDto> GetLocation(int id)
        {
            var location = (await _locationRepository.GetAsync(id));
            return ObjectMapper.Map<LocationDto>(location);
        }

        public async Task<ListResultDto<LocationDto>> GetLocations()
        {
            var patients = await _locationRepository.GetAllListAsync();

            return new ListResultDto<LocationDto>
            {
                Items = ObjectMapper.Map<List<LocationDto>>(patients)
            };
        }

        public async Task UpdateLocation(int id, JObject jInput)
        {
            try
            {
                dynamic input = jInput;
                string jsonText = Newtonsoft.Json.JsonConvert.SerializeObject(input);
                var parser = new FhirJsonParser();
                var fhirLocation = await parser.ParseAsync<Hl7.Fhir.Model.Location>(jsonText);
                var exLocation = await _locationRepository.GetAsync(id);
                exLocation.Description = fhirLocation.Description;
                exLocation.Mode = fhirLocation.Mode.Value.ToString();
                exLocation.Change += 1;
                exLocation.Name = fhirLocation.Name;
                exLocation.Status = fhirLocation.Status.Value.ToString();
                exLocation.JsonResource = jsonText;
                await _locationRepository.UpdateAsync(exLocation);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
