using Core.Dal.Base.Repositories;
using Core.Dapper.ConnectionFactories.Interfaces;
using Dal.Models;
using Dal.Repositories.Interfaces;

namespace Dal.Repositories;

/// <inheritdoc cref="Dal.Repositories.Interfaces.ICalendarEventRepository" />
internal class UserEventRepository : Repository<UserEventDal, Guid>, IUserEventRepository
{
    public UserEventRepository(IDbConnectionFactory dbConnectionFactory) : base(dbConnectionFactory)
    {
    }
}