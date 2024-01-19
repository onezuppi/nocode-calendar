using Core.Dal.Base.Models;

namespace Dal.Models;

/// <summary>
/// Модель связи пользователя и группы пользователей
/// </summary>
public class UserUserGroupDal : DalModelBase<Guid>
{
    /// <summary>
    /// Id пользователя
    /// </summary>
    public Guid UserId { get; set; }
    
    /// <summary>
    /// Id группы пользователей
    /// </summary>
    public Guid UserGroupId { get; set; }
}