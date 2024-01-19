using Api.Controllers.Public.Base.Dto.Response;
using Dal.Models;
using Dal.Models.Enums;

namespace Api.Controllers.Public.User.Dto.Response;

/// <summary>
/// Пользователи кабинета по их ролям в нем
/// </summary>
public class GetUserResponse : BaseIdResponse
{
    /// <summary>
    /// Настройки пользователя
    /// </summary>
    [CustomType(ColumnType.Json)]
    [JsonProperty("settings")]
    public UserSettingsResponse Settings { get; set; }

    /// <summary>
    /// Тип пользователя
    /// </summary>
    [JsonProperty("type")]
    public UserTypes Type { get; set; }

    /// <summary>
    /// Логин пользователя
    /// </summary>
    [JsonProperty("login")]
    public string Login { get; set; }

    /// <summary>
    /// Календарь пользователя, куда приходят приглашение от других пользователей
    /// </summary>
    [JsonProperty("mainCalendarId")]
    public Guid MainCalendarId { get; set; }

    /// <summary>
    /// ФИО
    /// </summary>
    [JsonProperty("fullName")]
    public string FullName { get; set; }
}