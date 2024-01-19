namespace Api.Controllers.Public.Event.Dto.Response.Base;

/// <summary>
/// Базовая полная модель события
/// </summary>
public class BaseEventFullResponse : BaseEventLightResponse
{
    /// <summary>
    /// Описание события
    /// </summary>
    [JsonProperty("description")]
    public string Description { get; set; }
}