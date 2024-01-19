using Api.Controllers.Public.Base.Dto.Response;
using Dal.Models;

namespace Api.Controllers.Public.Calendar.Dto.Response;

/// <summary>
/// Модель маленького календаря
/// </summary>
public class CalendarLightResponse : BaseIdResponse
{
    /// <summary>
    /// Название календаря
    /// </summary>
    [JsonProperty("name")]
    public string Name { get; set; }
    
    /// <summary>
    /// Цвет календаря
    /// </summary>
    [JsonProperty("color")]
    public string Color { get; set; }
}