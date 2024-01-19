using Api.Controllers.Public.Event.Dto.Response.Base;

namespace Api.Controllers.Public.Event.Dto.Response;

/// <summary>
/// получени списка ивентов, для реста получение ивентов
/// </summary>
public class GetEventListResponse : BaseEventLightResponse
{
    /// <summary>
    /// id календаря
    /// </summary>
    [JsonProperty("calendarId")] 
    public Guid CalendarId { get; set; }
}