using Api.Controllers.Public.Base.Dto.Response;
using Api.Controllers.Public.Calendar.Dto.Response;
using Api.Controllers.Public.Event.Dto.Request;
using Api.Controllers.Public.Event.Dto.Response;
using AutoMapper;
using Core.Api.Controllers.Base;
using Core.Api.Response;
using Dal.Computeds;
using Dal.Models;
using Logic.Extensions;
using Logic.Managers.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SadoCommonLib.SadoIdentity.Polices;

namespace Api.Controllers.Public.Event;

/// <summary>
/// Работа с пользователями и с группами пользователей
/// </summary>
[Route("client/public/event")]
[ApiVersion("1.0")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = RequireClientPolice.Name)]
public class EventController : BasePublicController
{
    private readonly ICalendarManager _calendarManager;
    private readonly IMapper _mapper;
    private readonly IEventManager _eventManager;
    private readonly IUserManager _userManager;

    public EventController(
        ICalendarManager calendarManager,
        IMapper mapper,
        IEventManager eventManager,
        IUserManager userManager
    )
    {
        _calendarManager = calendarManager;
        _mapper = mapper;
        _eventManager = eventManager;
        _userManager = userManager;
    }

    /// <summary>
    /// Получение всех событий по календарям id
    /// </summary>
    [HttpGet("list")]
    [ProducesResponseType(typeof(List<GetEventListResponse>), 200)]
    public async Task<IActionResult> GetEventList([FromQuery] DateTime from, [FromQuery] DateTime to,
        [FromQuery] List<Guid> calendarIdList, [FromQuery] string? nameSearch)
    {
        var response = new List<GetEventListResponse>();
        foreach (var id in calendarIdList)
        {
            var eventList = await _calendarManager.GetEventList(id, from, to, nameSearch);
            response.AddRange(
                eventList
                    .Select(x =>
                    {
                        var eventListResponse = _mapper.Map<EventWithoutRecurrenceComputed, GetEventListResponse>(x);
                        eventListResponse.CalendarId = id;
                        eventListResponse.Place = _mapper.Map<UserDal, GetUserLightResponse>(x.Place);

                        return eventListResponse;
                    })
                    .ToList()
            );
        }

        return new JsonResultWithSetting(response, 200, true);
    }

    /// <summary>
    /// Получение всех событий пользователя
    /// </summary>
    [HttpGet("list/{userId}")]
    [ProducesResponseType(typeof(List<GetEventListByUserIdResponse>), 200)]
    public async Task<IActionResult> GetEventListByUserId([FromRoute] Guid userId, [FromQuery] DateTime from, [FromQuery] DateTime to,
        [FromQuery] string? nameSearch)
    {
        var calendarList = await _calendarManager.GetCalendarListByUserId(userId);
        var response = new List<GetEventListByUserIdResponse>();
        foreach (var calendar in calendarList)
        {
            var eventList = await _calendarManager.GetEventList(calendar.Id, from, to, nameSearch);
            response.AddRange(_mapper.Map<List<EventWithoutRecurrenceComputed>, List<GetEventListByUserIdResponse>>(eventList));
        }

        return new JsonResultWithSetting(response, 200, true);
    }

    /// <summary>
    /// Создание ивента
    /// </summary>
    /// <returns>id записи ивента</returns>
    [HttpPost]
    [ProducesResponseType(typeof(CreateEventResponse), 200)]
    public async Task<IActionResult> CreateEvent([FromBody] CreateEventBaseRequest request)
    {
        var eventDalModel = _mapper.Map<CreateEventBaseRequest, EventDal>(request);
        eventDalModel.Id = Guid.NewGuid();
        eventDalModel.EventRecurrence = GetEventRecurrence(request.EventRecurrence, request.DateStartUtc);
        var eventId = await _eventManager.CreateEvent(eventDalModel, request.UserIdList, request.CalendarId, request.PlaceId);

        return new JsonResultWithSetting(new CreateEventResponse { Id = eventId }, 200, true);
    }

    /// <summary>
    /// Изменение ивента
    /// </summary>
    /// <returns>id записи ивента</returns>
    [HttpPost("edit")]
    [ProducesResponseType(typeof(EditEventResponse), 200)]
    public async Task<IActionResult> EditEvent([FromBody] EditEventRequest request)
    {
        var eventDalModel = _mapper.Map<EditEventRequest, EventDal>(request);
        eventDalModel.EventRecurrence = GetEventRecurrence(request.EventRecurrence, request.DateStartUtc);
        var eventId = await _eventManager.UpdateEvent(eventDalModel, request.UserIdList, request.CalendarId, request.PlaceId);

        return new JsonResultWithSetting(new EditEventResponse { Id = eventId }, 200, true);
    }

    /// <summary>
    /// Удаление ивента
    /// </summary>
    [HttpDelete("{eventId}")]
    [ProducesResponseType(200)]
    public async Task<IActionResult> DeleteEvent([FromRoute] Guid eventId, [FromQuery] DateTime dateEnd)
    {
        await _eventManager.DeleteEvent(eventId, dateEnd);

        return Ok();
    }


    /// <summary>
    /// получение полной информации о ивенте
    /// </summary>
    /// <returns>Информация по учетной записи</returns>
    [HttpGet("{eventId}")]
    [ProducesResponseType(typeof(GetEventFullResponse), 200)]
    public async Task<IActionResult> GetEventFull([FromRoute] Guid eventId)
    {
        var userList = await _eventManager.GetALlUsersByEvent(eventId);
        var eventDal = await _eventManager.GetEventByEventId(eventId);

        var response = _mapper.Map<GetEventFullResponse>(eventDal);
        response.UserList = _mapper.Map<List<GetUserLightResponse>>(userList);
        if (eventDal.PlaceId != null)
        {
            response.Place = _mapper.Map<GetUserLightResponse>(await _userManager.GetUserById(eventDal.PlaceId.Value));
        }
        response.EventRecurrenceResponse = _mapper.Map<EventRecurrenceResponse>(eventDal.EventRecurrence);
        response.Calendar = _mapper.Map<CalendarLightResponse>(await _calendarManager.GetByCalendarId(eventDal.CalendarId));

        return new JsonResultWithSetting(response, 200, true);
    }

    /// <summary>
    /// Получает по запросу повтора события DAL повтор события
    /// </summary>
    /// <param name="request"></param>
    /// <param name="dateStart"></param>
    /// <returns></returns>
    private EventRecurrence? GetEventRecurrence(EventRecurrenceRequest? request, DateTime dateStart)
    {
        EventRecurrence? eventRecurrence = null;
        if (request != null)
        {
            eventRecurrence = new EventRecurrence
            {
                DateStart = dateStart,
                Interval = request.Interval.GetInterval(dateStart)
            };
        }

        return eventRecurrence;
    }
}