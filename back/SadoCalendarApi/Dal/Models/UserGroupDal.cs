using Core.Dal.Base.Models;

namespace Dal.Models;

/// <summary>
/// Модель группы пользователя
/// </summary>
public class UserGroupDal : DalModelBase<Guid>
{
    /// <summary>
    ///  Имя группы пользователей
    /// </summary>
    public string Name { get; set; }
}