using Core.Dal.Base.Models;

namespace Dal.Models;

/// <summary>
/// Модель связи календаря и события
/// </summary>
public class CalendarEventDal : DalModelBase<Guid>
{
    /// <summary>
    /// Id календаря
    /// </summary>
    public Guid CalendarId { get; set; }
    
    /// <summary>
    /// Id события
    /// </summary>
    public Guid EventId { get; set; }
}