using Api.Controllers.Public.Base.Dto.Response;
using AutoMapper;
using Dal.Models;

namespace Api.Controllers.Public.Base.Profiles;

public class BaseProfile : Profile
{
    public BaseProfile()
    {
        CreateMap<UserDal, GetUserLightResponse>();
    }
}