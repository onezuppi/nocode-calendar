using Api.Controllers.Public.Base.Dto.Response;

namespace Api.Controllers.Public.User.Dto.Response;

public class GetUserGroupsResponse : BaseIdResponse
{
    /// <summary>
    /// Имя группы
    /// </summary>
    [JsonProperty("name")]
    public string Name { get; set; }
    
    /// <summary>
    /// Участники группы
    /// </summary>
    [JsonProperty("userList")]
    public List<GetUserResponse> UserList { get; set; }
}