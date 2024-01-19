using Core.Dal.Base.Repositories;
using Core.Dapper.ConnectionFactories.Interfaces;
using Dal.Models;
using Dal.Repositories.Interfaces;

namespace Dal.Repositories;

/// <inheritdoc cref="Dal.Repositories.Interfaces.ICalendarEventRepository" />
internal class UserUserGroupRepository : Repository<UserUserGroupDal, Guid>, IUserUserGroupRepository
{
    public UserUserGroupRepository(IDbConnectionFactory dbConnectionFactory) : base(dbConnectionFactory)
    {
    }
}