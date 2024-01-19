using Core.Dal.Base.Repositories.Interfaces;
using Dal.Models;

namespace Dal.Repositories.Interfaces;

/// <summary>
/// Работа с пользователями
/// </summary>
public interface IUserCalendarRepository : IRepository<UserCalendarDal, Guid>
{
}