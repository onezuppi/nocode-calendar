using Api.Controllers.Public.Base.Dto.Response;
using Api.Controllers.Public.Calendar.Dto.Response;

namespace Api.Controllers.Public.Event.Dto.Response.Base;

/// <summary>
/// Базовая маленькая модель события
/// </summary>
public class BaseEventLightResponse
{
    /// <summary>
    /// Id ивента
    /// </summary>
    [JsonProperty("id")]
    public Guid Id { get; set; }

    /// <summary>
    /// Название ивента
    /// </summary>
    [JsonProperty("name")]
    public string Name { get; set; }

    /// <summary>
    /// Начало ивента
    /// </summary>
    [JsonProperty("dateStartUtc")]
    public DateTime DateStartUtc { get; set; }

    /// <summary>
    /// Дата конца ивента
    /// </summary>
    [JsonProperty("dateEndUtc")]
    public DateTime DateEndUtc { get; set; }

    /// <summary>
    /// Место события
    /// </summary>
    [JsonProperty("place")]
    public GetUserLightResponse? Place { get; set; }

    /// <summary>
    /// Цвет соыбтия
    /// </summary>
    [JsonProperty("color")]
    public string Color { get; set; }
}