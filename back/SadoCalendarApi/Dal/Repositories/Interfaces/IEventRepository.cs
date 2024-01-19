using Core.Dal.Base.Repositories.Interfaces;
using Dal.Computeds;
using Dal.Models;

namespace Dal.Repositories.Interfaces;

//// <summary>
/// Работа с событиями
/// </summary>
public interface IEventRepository : IRepository<EventDal, Guid>
{
    Task<EventUserComputedDal> GetEventUserListOrDefaultAsync(Guid eventId);
}