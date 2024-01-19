using Api.Controllers.Public.Calendar.Dto.Response;
using AutoMapper;
using Dal.Computeds;
using Dal.Models;

namespace Api.Controllers.Public.Calendar.Profiles;

public class CalendarProfile : Profile
{
    public CalendarProfile()
    {
        CreateMap<CalendarDal, CalendarLightResponse>();
    }
}