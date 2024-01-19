using Api.Controllers.Public.Calendar.Dto.Request;
using Api.Controllers.Public.Calendar.Dto.Response;
using AutoMapper;
using Core.Api.Controllers.Base;
using Core.Api.Response;
using Dal.Computeds;
using Dal.Models;
using Logic.Managers.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SadoCommonLib.SadoIdentity.Polices;
using SadoCommonLib.SadoIdentity.Services.Interfaces;

namespace Api.Controllers.Public.Calendar;

/// <summary>
/// Работа с пользователями и с группами пользователей
/// </summary>
[Route("client/public/calendar")]
[ApiVersion("1.0")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = RequireClientPolice.Name)]
public class CalendarController : BasePublicController
{
    private readonly ISadoIdentityService _sadoIdentityService;
    private readonly ICalendarManager _calendarManager;
    private readonly IMapper _mapper;

    public CalendarController(
        ISadoIdentityService sadoIdentityService,
        ICalendarManager calendarManager,
        IMapper mapper
    )
    {
        _sadoIdentityService = sadoIdentityService;
        _calendarManager = calendarManager;
        _mapper = mapper;
    }

    /// <summary>
    /// Получает список всех календарей
    /// </summary>
    /// <param name="nameSearch"></param>
    /// <returns></returns>
    [HttpGet("list")]
    [ProducesResponseType(typeof(List<CalendarLightResponse>), 200)]
    public async Task<IActionResult> GetCalendarList([FromQuery] string? nameSearch)
    {
        var calendarList = await _calendarManager.GetCalendarList(nameSearch);
        var response = _mapper.Map<List<CalendarDal>, List<CalendarLightResponse>>(calendarList);

        return new JsonResultWithSetting(response, 200, true);
    }

    /// <summary>
    /// Получает список моих календарей
    /// </summary>
    /// <param name="nameSearch"></param>
    /// <returns></returns>
    [HttpGet("mine")]
    [ProducesResponseType(typeof(List<CalendarLightResponse>), 200)]
    public async Task<IActionResult> GetCurrentUserCalendarList([FromQuery] string? nameSearch)
    {
        var userId = _sadoIdentityService.GetIdentityUserId();
        var calendarList = await _calendarManager.GetCalendarListByUserId(userId, nameSearch);
        var response = _mapper.Map<List<CalendarDal>, List<CalendarLightResponse>>(calendarList);

        return new JsonResultWithSetting(response, 200, true);
    }

    /// <summary>
    /// Создание календарей
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpPost]
    [ProducesResponseType(typeof(CreateCalendarResponse), 200)]
    public async Task<IActionResult> CreateCalendar([FromBody] CreateCalendarRequest request)
    {
        var userId = _sadoIdentityService.GetIdentityUserId();
        var calendarId = await _calendarManager.CreateCalendar(userId, request.Name, request.Color);

        return new JsonResultWithSetting(new CreateCalendarResponse { Id = calendarId }, 200, true);
    }

    /// <summary>
    /// Удаление календарей
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpDelete]
    [ProducesResponseType(200)]
    public async Task<IActionResult> DeleteCalendar([FromBody] DeleteCalendarRequest request)
    {
        await _calendarManager.DeleteCalendar(request.Id);

        return Ok();
    }

    /// <summary>
    /// Обновление календаря
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpPost("edit")]
    [ProducesResponseType(typeof(EditCalendarResponse), 200)]
    public async Task<IActionResult> UpdateCalendar([FromBody] UpdateCalendarRequest request)
    {
        await _calendarManager.UpdateCalendar(request.Id, request.Name, request.Color);

        return new JsonResultWithSetting(new EditCalendarResponse { Id = request.Id }, 200, true);
    }

    /// <summary>
    /// Закрепить календарь к пользователю
    /// </summary>
    /// <param name="calendarList"></param>
    /// <returns></returns>
    [HttpPost("bind")]
    [ProducesResponseType(typeof(BindUnbindCalendarResponse), 200)]
    public async Task<IActionResult> BindCalendarList([FromQuery] List<Guid> calendarList)
    {
        var userId = _sadoIdentityService.GetIdentityUserId();
        var response = await _calendarManager.BindCalendarToUser(userId, calendarList);

        return new JsonResultWithSetting(new BindUnbindCalendarResponse() { CurrenUserCalendarList = response }, 200, true);
    }

    /// <summary>
    /// Открепить календарь от пользователя
    /// </summary>
    /// <param name="calendarList"></param>
    /// <returns></returns>
    [HttpPost("unbind")]
    [ProducesResponseType(typeof(BindUnbindCalendarResponse), 200)]
    public async Task<IActionResult> UnbindCalendarList([FromQuery] List<Guid> calendarList)
    {
        var userId = _sadoIdentityService.GetIdentityUserId();
        var response = await _calendarManager.UnbindCalendarToUser(userId, calendarList);

        return new JsonResultWithSetting(new BindUnbindCalendarResponse() { CurrenUserCalendarList = response }, 200, true);
    }

    /// <summary>
    /// Скачать календарь
    /// </summary>
    /// <param name="calendarIdList"></param>
    /// <param name="from"></param>
    /// <param name="to"></param>
    /// <returns></returns>
    [HttpGet("download")]
    [ProducesResponseType(typeof(byte[]), 200)]
    public async Task<IActionResult> DownloadCalendar([FromQuery] List<Guid> calendarIdList, [FromQuery] DateTime from, [FromQuery] DateTime to)
    {
        var eventList = new List<EventWithoutRecurrenceComputed>();
        foreach (var calendarId in calendarIdList)
        {
            eventList.AddRange(await _calendarManager.GetEventList(calendarId, from, to));
        }
        var calendarToDownload = await _calendarManager.CreateCalendarToDownload(eventList);

        return File(calendarToDownload, "text/calendar", "calendar.ics");
    }
}