namespace Api.Controllers.Public.Calendar.Dto.Request;

/// <summary>
/// Обновление календаря
/// </summary>
public class UpdateCalendarRequest
{
    /// <summary>
    /// Id календаря на изменение
    /// </summary>
    [JsonProperty("id")]
    public Guid Id { get; set; }
    
    /// <summary>
    /// Новое имя календаря
    /// </summary>
    [JsonProperty("name")]
    public string? Name { get; set; }
    
    /// <summary>
    /// Новый цвет календаря
    /// </summary>
    [JsonProperty("color")]
    public string? Color { get; set; }
}