namespace Api.Controllers.Public.Base.Dto.Response;

/// <summary>
/// модель пользователей для всех контроллеров, кроме user/info
/// </summary>
public class GetUserLightResponse
{
    /// <summary>
    /// Первичный ключ
    /// </summary>
    [JsonProperty("id")]
    public Guid Id { get; set; }

    /// <summary>
    /// Логин пользователя
    /// </summary>
    [JsonProperty("login")]
    public string Login { get; set; }

    /// <summary>
    /// ФИО
    /// </summary>
    [JsonProperty("fullName")]
    public string FullName { get; set; }
}