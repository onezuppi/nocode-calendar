using Core.Dal.Base.Models;

namespace Dal.Models;

/// <summary>
/// Модель связи пользователя и календаря
/// </summary>
public class UserCalendarDal : DalModelBase<Guid>
{
    /// <summary>
    /// Id пользователя
    /// </summary>
    public Guid UserId { get; set; }
    
    /// <summary>
    /// Id календаря
    /// </summary>
    public Guid CalendarId { get; set; }
}