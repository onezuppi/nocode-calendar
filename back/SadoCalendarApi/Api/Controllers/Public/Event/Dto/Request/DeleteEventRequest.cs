namespace Api.Controllers.Public.Event.Dto.Request;

/// <summary>
/// Запрос на удаление события
/// </summary>
public class DeleteEventRequest
{
    /// <summary>
    /// Id события на удаление
    /// </summary>
    [JsonProperty("eventId")]
    public Guid EventId { get; set; }
}