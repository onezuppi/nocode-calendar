using Core.Dal.Base.Repositories;
using Core.Dapper.ConnectionFactories.Interfaces;
using Dal.Models;
using Dal.Repositories.Interfaces;

namespace Dal.Repositories;

/// <inheritdoc cref="Dal.Repositories.Interfaces.ICalendarEventRepository" />
internal class CalendarEventRepository : Repository<CalendarEventDal, Guid>, ICalendarEventRepository
{
    public CalendarEventRepository(IDbConnectionFactory dbConnectionFactory) : base(dbConnectionFactory)
    {
    }
}