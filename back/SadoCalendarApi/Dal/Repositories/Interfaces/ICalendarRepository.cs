using System.Data;
using Core.Dal.Base.Repositories.Interfaces;
using Dal.Computeds;
using Dal.Models;

namespace Dal.Repositories.Interfaces;

/// <summary>
/// Работа с календарём
/// </summary>
public interface ICalendarRepository : IRepository<CalendarDal, Guid>
{
    Task<CalendarEventComputedDal> GetCalendarEventListOrDefaultAsync(Guid calendarId);
}