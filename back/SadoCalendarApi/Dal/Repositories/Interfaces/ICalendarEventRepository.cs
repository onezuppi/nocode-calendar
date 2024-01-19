using Core.Dal.Base.Repositories.Interfaces;
using Dal.Models;

namespace Dal.Repositories.Interfaces;

/// <summary>
/// Работа с календарём
/// </summary>
public interface ICalendarEventRepository : IRepository<CalendarEventDal, Guid>
{
}