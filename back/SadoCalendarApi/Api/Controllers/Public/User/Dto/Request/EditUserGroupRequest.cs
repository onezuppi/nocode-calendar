namespace Api.Controllers.Public.User.Dto.Request;

/// <summary>
/// Изменить группу пользователей запрос
/// </summary>
public class EditUserGroupRequest
{
    /// <summary>
    /// Идентификатор группы
    /// </summary>
    [JsonProperty("groupId")]
    public Guid GroupId { get; set; }

    /// <summary>
    /// список пользователей которых нужно добавить
    /// </summary>
    [JsonProperty("userGuidList")]
    public List<Guid> UserGuidList { get; set; }
}