using Core.Dal.Base.Models;
using Dal.Models.Enums;

namespace Dal.Models;

/// <summary>
/// Модель пользователя
/// </summary>
public class UserDal : DalModelBase<Guid>
{
    /// <summary>
    /// Настройки пользователя
    /// </summary>
    [CustomType(ColumnType.Json)]
    public UserSettingsModel Settings { get; set; }

    /// <summary>
    /// Тип пользователя
    /// </summary>
    public UserTypes Type { get; set; }

    /// <summary>
    /// Логин пользователя
    /// </summary>
    public string Login { get; set; }

    /// <summary>
    /// Календарь пользователя, куда приходят приглашение от других пользователей
    /// </summary>
    public Guid MainCalendarId { get; set; }

    /// <summary>
    /// ФИО
    /// </summary>
    public string FullName { get; set; }
}