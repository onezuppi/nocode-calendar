using Dal.Models.Enums;

namespace Dal.Models;

/// <summary>
/// Настройки пользователя
/// </summary>
public class UserSettingsModel
{
    /// <summary>
    /// Выбранный таб пользователя
    /// </summary>
    public SelectedTabs SelectedTabEnum { get; set; }
    
    /// <summary>
    /// Выбранные календари пользователя
    /// </summary>
    public List<Guid> SelectedCalendarIdList { get; set; }
}