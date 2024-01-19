using Core.Dal.Base.Repositories.Interfaces;
using Dal.Computeds;
using Dal.Models;

namespace Dal.Repositories.Interfaces;

/// <summary>
/// Работа с группой пользователей
/// </summary>
public interface IUserGroupRepository : IRepository<UserGroupDal, Guid>
{
    Task<UserGroupUserComputedDal> GetUserGroupUserListOrDefaultAsync(Guid userGroupId);
}