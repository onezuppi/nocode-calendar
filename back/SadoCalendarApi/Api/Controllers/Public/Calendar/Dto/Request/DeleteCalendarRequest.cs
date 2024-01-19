namespace Api.Controllers.Public.Calendar.Dto.Request;

/// <summary>
/// Запрос на удаление календаря
/// </summary>
public class DeleteCalendarRequest
{
    /// <summary>
    /// Id календаря на удаление
    /// </summary>
    [JsonProperty("id")]
    public Guid Id { get; set; }
}