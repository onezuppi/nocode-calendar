using Core.Dal.Base.Repositories;
using Core.Dapper.ConnectionFactories.Interfaces;
using Core.Dapper.Helpers;
using Dal.Computeds;
using Dal.Models;
using Dal.Repositories.Interfaces;
using Dapper;

namespace Dal.Repositories;

/// <inheritdoc cref="Dal.Repositories.Interfaces.IEventRepository" />
internal class EventRepository : Repository<EventDal, Guid>, IEventRepository
{
    public EventRepository(IDbConnectionFactory dbConnectionFactory) : base(dbConnectionFactory)
    {
    }

    /// <inheritdoc />
    public async Task<EventUserComputedDal> GetEventUserListOrDefaultAsync(Guid eventId)
    {
        var sql = $" SELECT * FROM {DalMapper.TbName<EventDal>()} " +
                  $" LEFT JOIN {DalMapper.TbName<UserEventDal>()} " +
                  $" ON {DalMapper.ColName<EventDal>(q => q.Id)} = {DalMapper.ColName<UserEventDal>(q => q.EventId)} " +
                  $" LEFT JOIN {DalMapper.TbName<UserDal>()} " +
                  $" ON {DalMapper.ColName<UserDal>(q => q.Id)} = {DalMapper.ColName<UserEventDal>(q => q.UserId)} "
                  + $"WHERE {DalMapper.ColName<EventDal>(q => q.Id)} = {DalMapper.ParameterPrefix}{nameof(eventId)}";

        EventUserComputedDal eventUserComputedDal = null;
        await Connection.QueryAsync<EventUserComputedDal, UserEventDal, UserDal, EventUserComputedDal>(sql,
            (dal, eventUserDal, userDal) =>
            {
                eventUserComputedDal ??= dal;

                if (!eventUserComputedDal.UserDalList.Exists(value => value.Id == userDal.Id))
                {
                    eventUserComputedDal.UserDalList.Add(userDal);
                }

                return dal;
            }, new { eventId });

        return eventUserComputedDal;
    }
}