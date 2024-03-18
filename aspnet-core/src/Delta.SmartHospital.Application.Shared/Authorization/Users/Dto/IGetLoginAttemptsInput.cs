using Abp.Application.Services.Dto;

namespace Delta.SmartHospital.Authorization.Users.Dto
{
    public interface IGetLoginAttemptsInput: ISortedResultRequest
    {
        string Filter { get; set; }
    }
}