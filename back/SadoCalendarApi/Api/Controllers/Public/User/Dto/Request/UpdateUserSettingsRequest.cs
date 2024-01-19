using Api.Controllers.Public.User.Dto.Response;

namespace Api.Controllers.Public.User.Dto.Request;

/// <summary>
/// Обновление настроек пользователя запрос
/// </summary>
public class UpdateUserSettingsRequest
{
    /// <summary>
    /// Настройки пользователся
    /// </summary>
    [JsonProperty("settings")]
    public UserSettingsResponse Settings { get; set; }
}