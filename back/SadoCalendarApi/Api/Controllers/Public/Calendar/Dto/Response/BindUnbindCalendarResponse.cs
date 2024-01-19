namespace Api.Controllers.Public.Calendar.Dto.Response;

/// <summary>
/// Привязка/отвязка календарей от пользователя
/// </summary>
public class BindUnbindCalendarResponse
{
    /// <summary>
    /// Календари текущего пользователя
    /// </summary>
    [JsonProperty("currenUserCalendarList")]
    public List<Guid> CurrenUserCalendarList { get; set; }
}