using Core.Dal.Base.Models;

namespace Dal.Models;

/// <summary>
/// Модель связи пользователя и события
/// </summary>
public class UserEventDal : DalModelBase<Guid>
{
    /// <summary>
    /// Id пользователя
    /// </summary>
    public Guid UserId { get; set; }
    
    /// <summary>
    /// Id события
    /// </summary>
    public Guid EventId { get; set; }
}