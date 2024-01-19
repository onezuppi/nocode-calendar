using Core.Dal.Base.Repositories.Interfaces;
using Dal.Models;

namespace Dal.Repositories.Interfaces;

/// <summary>
/// Работа с пользователями
/// </summary>
public interface IUserUserGroupRepository : IRepository<UserUserGroupDal, Guid>
{
}