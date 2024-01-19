using System.Data;
using Core.Dal.Base.Repositories.Interfaces;
using Dal.Computeds;
using Dal.Models;

namespace Dal.Repositories.Interfaces;

/// <summary>
/// Работа с пользователями
/// </summary>
public interface IUserRepository : IRepository<UserDal, Guid>
{
    Task<UserCalendarComputedDal> GetUserCalendarListOrDefaultAsync(Guid userId);
}