using Api.Controllers.Public.Calendar.Dto.Response;
using Api.Controllers.Public.Event.Dto.Response.Base;

namespace Api.Controllers.Public.Event.Dto.Response;

/// <summary>
/// Получение списка событий по user id
/// </summary>
public class GetEventListByUserIdResponse: BaseEventFullResponse
{
    /// <summary>
    /// Календарь ивента
    /// </summary>
    [JsonProperty("calendar")]
    public CalendarLightResponse Calendar { get; set; }
}