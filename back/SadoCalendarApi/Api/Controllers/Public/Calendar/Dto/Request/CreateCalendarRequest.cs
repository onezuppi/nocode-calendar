namespace Api.Controllers.Public.Calendar.Dto.Request;

/// <summary>
/// Запрос на создание календаря
/// </summary>
public class CreateCalendarRequest
{
    /// <summary>
    /// Название календаря
    /// </summary>
    [JsonProperty("name")]
    public string Name { get; set; }
    
    /// <summary>
    /// цвет календаря
    /// </summary>
    [JsonProperty("color")]
    public string Color { get; set; }
}