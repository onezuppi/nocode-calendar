using Core.Dal.Base.Repositories;
using Core.Dapper.ConnectionFactories.Interfaces;
using Core.Dapper.Helpers;
using Dal.Computeds;
using Dal.Models;
using Dal.Repositories.Interfaces;
using Dapper;

namespace Dal.Repositories;

/// <inheritdoc cref="Dal.Repositories.Interfaces.IUserRepository" />
internal class UserRepository : Repository<UserDal, Guid>, IUserRepository
{
    public UserRepository(IDbConnectionFactory dbConnectionFactory) : base(dbConnectionFactory)
    {
    }

    /// <inheritdoc />
    public async Task<UserCalendarComputedDal> GetUserCalendarListOrDefaultAsync(Guid userId)
    {
        var sql = $" SELECT * FROM {DalMapper.TbName<UserDal>()} " +
                  $" LEFT JOIN {DalMapper.TbName<UserCalendarDal>()} " +
                  $" ON {DalMapper.ColName<UserDal>(q => q.Id)} = {DalMapper.ColName<UserCalendarDal>(q => q.UserId)} " +
                  $" LEFT JOIN {DalMapper.TbName<CalendarDal>()} " +
                  $" ON {DalMapper.ColName<CalendarDal>(q => q.Id)} = {DalMapper.ColName<UserCalendarDal>(q => q.CalendarId)} "
                  + $"WHERE {DalMapper.ColName<UserDal>(q => q.Id)} = {DalMapper.ParameterPrefix}{nameof(userId)}";

        UserCalendarComputedDal userCalendarComputedDal = null;
        await Connection.QueryAsync<UserCalendarComputedDal, UserCalendarDal, CalendarDal, UserCalendarComputedDal>(sql,
            (dal, userCalendarDal, calendarDal) =>
            {
                userCalendarComputedDal ??= dal;

                if (!userCalendarComputedDal.CalendarDalList.Exists(value => value.Id == calendarDal.Id))
                {
                    userCalendarComputedDal.CalendarDalList.Add(calendarDal);
                }

                return dal;
            }, new { userId });

        return userCalendarComputedDal;
    }
}