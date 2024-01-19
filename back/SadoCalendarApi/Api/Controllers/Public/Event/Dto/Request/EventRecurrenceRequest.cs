using Dal.Models.Enums;

namespace Api.Controllers.Public.Event.Dto.Request;

/// <summary>
/// Запрос на изменение повтора события
/// </summary>
public class EventRecurrenceRequest
{
    /// <summary>
    /// Интервал события
    /// </summary>
    [JsonProperty("interval")] 
    public EventRecurrenceIntervals Interval { get; set; }
}