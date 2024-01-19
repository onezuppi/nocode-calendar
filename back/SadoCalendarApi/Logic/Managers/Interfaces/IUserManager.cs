using Dal.Computeds;
using Dal.Models;

namespace Logic.Managers.Interfaces;

/// <summary>
/// Менеджер по работе с пользователями
/// </summary>
public interface IUserManager
{
    /// <summary>
    /// Проверяет, что пользователь создан или создает нвоого по данным из identity service
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<UserDal> GetUserAfterCheckExistOrCreate(Guid userId);

    /// <summary>
    /// Получение всех пользователей
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<List<UserDal>> GetUserList(string? fullNameSearch = null);

    /// <summary>
    /// Обновляет настройки пользователя
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="settings"></param>
    /// <returns></returns>
    Task UpdateUserSettings(Guid userId, UserSettingsModel settings);

    /// <summary>
    /// Создание группы пользователей
    /// </summary>
    /// <param name="userGroupName"></param>
    /// <param name="userIdList"></param>
    /// <returns></returns>
    Task<Guid> CreateUserGroup(string userGroupName, List<Guid> userIdList);

    /// <summary>
    /// Создание переговорной комнаты
    /// </summary>
    /// <param name="placeName"></param>
    /// <returns></returns>
    Task<Guid> CreatePlace(string placeName);

    /// <summary>
    /// Изменить группу пользователей
    /// </summary>
    /// <param name="userGroupId"></param>
    /// <param name="userIdList"></param>
    /// <returns></returns>
    Task<Guid> EditUserGroup(Guid userGroupId, List<Guid> userIdList);

    /// <summary>
    /// Получает группы пользователей
    /// </summary>
    /// <returns></returns>
    Task<List<UserGroupUserComputedDal>> GetUserGroupList();

    /// <summary>
    /// Получение пользователя по userId
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<UserDal> GetUserById(Guid userId);

    /// <summary>
    /// Удаляет пользователя по id
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task DeleteUserById(Guid userId);
}