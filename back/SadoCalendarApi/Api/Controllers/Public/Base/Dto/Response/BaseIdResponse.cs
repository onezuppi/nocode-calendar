namespace Api.Controllers.Public.Base.Dto.Response;

/// <summary>
/// Базовый ответ с id
/// </summary>
public class BaseIdResponse
{
    /// <summary>
    /// Id сущности
    /// </summary>
    [JsonProperty("id")]
    public Guid Id { get; set; }
}