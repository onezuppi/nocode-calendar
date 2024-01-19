namespace Api.Controllers.Public.User.Dto.Request;

/// <summary>
/// Создание группы пользователей запрос
/// </summary>
public class CreateUserGroupRequest
{
    /// <summary>
    /// название группы
    /// </summary>
    [JsonProperty("name")]
    public string Name { get; set; }

    /// <summary>
    /// список пользователей для группы
    /// </summary>
    [JsonProperty("userGuidList")]
    public List<Guid> UserGuidList { get; set; }
}