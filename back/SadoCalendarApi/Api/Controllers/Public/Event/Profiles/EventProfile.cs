using Api.Controllers.Public.Event.Dto.Request;
using Api.Controllers.Public.Event.Dto.Response;
using AutoMapper;
using Dal.Computeds;
using Dal.Models;

namespace Api.Controllers.Public.Event.Profiles;

public class EventProfile : Profile
{
    public EventProfile()
    {
        CreateMap<EventWithoutRecurrenceComputed, GetEventListByUserIdResponse>();
        CreateMap<EventRecurrence, EventRecurrenceResponse>();
        CreateMap<EventDal, GetEventFullResponse>();
        CreateMap<CreateEventBaseRequest, EventDal>()
            .ForMember(x => x.EventRecurrence, y => y.Ignore())
            .ForMember(x => x.Id, y => y.Ignore());
        CreateMap<EditEventRequest, EventDal>()
            .ForMember(x => x.EventRecurrence, y => y.Ignore())
            .ForMember(x => x.Id, src => src.MapFrom(from => from.EventId));
        CreateMap<EventWithoutRecurrenceComputed, GetEventListResponse>()
            .ForMember(x => x.Place, y => y.Ignore())
            .ForMember(x => x.CalendarId, y => y.Ignore());
        CreateMap<EventDal, GetEventFullResponse>()
            .ForMember(x => x.Calendar, y => y.Ignore())
            .ForMember(d => d.Place, y => y.Ignore())
            .ForMember(d => d.EventRecurrenceResponse, y => y.Ignore())
            .ForMember(d => d.UserList, y => y.Ignore());
    }
}