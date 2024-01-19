namespace Api.Controllers.Public.User.Dto.Request;

/// <summary>
/// Создание переговорной комнаты
/// </summary>
public class CreatePlaceRequest
{
    /// <summary>
    /// название комнаты
    /// </summary>
    [JsonProperty("name")]
    public string Name { get; set; }
}