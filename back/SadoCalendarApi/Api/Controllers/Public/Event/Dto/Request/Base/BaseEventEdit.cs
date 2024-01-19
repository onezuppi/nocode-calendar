using Core.Api.Request.Validation;

namespace Api.Controllers.Public.Event.Dto.Request.Base;

/// <summary>
/// Базовая модель изменения ивента
/// </summary>
public class BaseEventEdit
{
    /// <summary>
    /// Id события
    /// </summary>
    [JsonProperty("calendarId")]
    [RequiredAbanking]
    public Guid CalendarId { get; set; }

    /// <summary>
    /// Список пользователей
    /// </summary>
    [JsonProperty("userIdList")]
    [RequiredAbanking]
    public List<Guid> UserIdList { get; set; }

    /// <summary>
    /// Имя события
    /// </summary>
    [JsonProperty("name")]
    [RequiredAbanking]
    public string Name { get; set; }

    /// <summary>
    /// Описание события
    /// </summary>
    [JsonProperty("description")]
    public string? Description { get; set; }

    /// <summary>
    /// Начало события
    /// </summary>
    [JsonProperty("dateStartUtc")]
    [RequiredAbanking]
    public DateTime DateStartUtc { get; set; }

    /// <summary>
    /// Конец события
    /// </summary>
    [JsonProperty("dateEndUtc")]
    [RequiredAbanking]
    public DateTime DateEndUtc { get; set; }

    /// <summary>
    /// Id места переговорки
    /// </summary>
    [JsonProperty("placeId")]
    public Guid? PlaceId { get; set; }

    /// <summary>
    /// Цвет события
    /// </summary>
    [JsonProperty("color")]
    [RequiredAbanking]
    public string Color { get; set; }

    /// <summary>
    /// Повтор события
    /// </summary>
    [JsonProperty("eventRecurrence")]
    public EventRecurrenceRequest? EventRecurrence { get; set; }
}