using System.Data;
using Core.Dal.Base.Repositories;
using Core.Dapper.ConnectionFactories.Interfaces;
using Core.Dapper.Helpers;
using CoreLib.Database.Dapper.Extensions.Postgresql;
using Dal.Computeds;
using Dal.Models;
using Dal.Repositories.Interfaces;
using Dapper;

namespace Dal.Repositories;

/// <inheritdoc cref="Dal.Repositories.Interfaces.ICalendarRepository" />
internal class CalendarRepository : Repository<CalendarDal, Guid>, ICalendarRepository
{
    public CalendarRepository(IDbConnectionFactory dbConnectionFactory) : base(dbConnectionFactory)
    {
    }

    /// <inheritdoc />
    public async Task<CalendarEventComputedDal> GetCalendarEventListOrDefaultAsync(Guid calendarId)
    {
        var sql = $" SELECT * FROM {DalMapper.TbName<CalendarDal>()} " +
                  $" LEFT JOIN {DalMapper.TbName<CalendarEventDal>()} " +
                  $" ON {DalMapper.ColName<CalendarDal>(q => q.Id)} = {DalMapper.ColName<CalendarEventDal>(q => q.CalendarId)} " +
                  $" LEFT JOIN {DalMapper.TbName<EventDal>()} " +
                  $" ON {DalMapper.ColName<EventDal>(q => q.Id)} = {DalMapper.ColName<CalendarEventDal>(q => q.EventId)} "
                  + $"WHERE {DalMapper.ColName<CalendarDal>(q => q.Id)} = {DalMapper.ParameterPrefix}{nameof(calendarId)}";

        CalendarEventComputedDal userCalendarComputedDal = null;
        await Connection.QueryAsync<CalendarEventComputedDal, CalendarEventDal, EventDal, CalendarEventComputedDal>(sql,
            (dal, userCalendarDal, calendarDal) =>
            {
                userCalendarComputedDal ??= dal;

                if (!userCalendarComputedDal.EventDalList.Exists(value => value.Id == calendarDal.Id))
                {
                    userCalendarComputedDal.EventDalList.Add(calendarDal);
                }

                return dal;
            }, new { calendarId });

        return userCalendarComputedDal;
    }
}