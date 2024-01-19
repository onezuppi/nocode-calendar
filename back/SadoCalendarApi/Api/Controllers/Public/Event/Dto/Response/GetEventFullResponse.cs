using Api.Controllers.Public.Base.Dto.Response;
using Api.Controllers.Public.Calendar.Dto.Response;
using Api.Controllers.Public.Event.Dto.Response.Base;

namespace Api.Controllers.Public.Event.Dto.Response;

/// <summary>
/// Получение полной информации по событию
/// </summary>
public class GetEventFullResponse : BaseEventFullResponse
{
    /// <summary>
    /// Календарь ивента
    /// </summary>
    [JsonProperty("calendar")] 
    public CalendarLightResponse Calendar { get; set; }

    /// <summary>
    /// Список пользователей ивента
    /// </summary>
    [JsonProperty("userList")] 
    public List<GetUserLightResponse> UserList { get; set; }
    
    /// <summary>
    /// Получение повтора события
    /// </summary>
    [JsonProperty("eventRecurrence")] 
    public EventRecurrenceResponse EventRecurrenceResponse { get; set; }
}