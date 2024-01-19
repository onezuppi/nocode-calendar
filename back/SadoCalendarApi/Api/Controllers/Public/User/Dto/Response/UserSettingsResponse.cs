using Dal.Models.Enums;

namespace Api.Controllers.Public.User.Dto.Response;

public class UserSettingsResponse
{
    /// <summary>
    /// Выбранный таб пользователя
    /// </summary>
    [JsonProperty("selectedTabEnum")]
    public SelectedTabs SelectedTabEnum { get; set; }
    
    /// <summary>
    /// Выбранные календари пользователя
    /// </summary>
    [JsonProperty("selectedCalendarIdList")]
    public List<Guid> SelectedCalendarIdList { get; set; }
}