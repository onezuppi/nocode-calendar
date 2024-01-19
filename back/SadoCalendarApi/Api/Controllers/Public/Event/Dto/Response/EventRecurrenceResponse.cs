namespace Api.Controllers.Public.Event.Dto.Response;

/// <summary>
/// Запрос на повтор событий
/// </summary>
public class EventRecurrenceResponse
{
    /// <summary>
    /// Время между событиями в днях
    /// </summary>
    [JsonProperty("interval")]
    public long Interval { get; set; }
}