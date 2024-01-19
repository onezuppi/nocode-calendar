using Api.Controllers.Public.Event.Dto.Request.Base;

namespace Api.Controllers.Public.Event.Dto.Request;

/// <summary>
/// Запрос на изменение события
/// </summary>
public class EditEventRequest : BaseEventEdit
{
    /// <summary>
    /// id ивента
    /// </summary>
    [JsonProperty("eventId")]
    public Guid EventId { get; set; }
}