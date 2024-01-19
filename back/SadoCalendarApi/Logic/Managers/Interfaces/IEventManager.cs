using Dal.Models;

namespace Logic.Managers.Interfaces;

/// <summary>
/// Менеджер по работе с пользователями
/// </summary>
public interface IEventManager
{
    /// <summary>
    /// Создание ивента
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<Guid> CreateEvent(EventDal eventDal, List<Guid> userIdList, Guid calendarId, Guid? placeId);

    /// <summary>
    /// Изменение ивента
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<Guid> UpdateEvent(EventDal eventDal, List<Guid> userIdList, Guid calendarId, Guid? placeId);

    /// <summary>
    /// Удаление ивента
    /// </summary>
    /// <param name="eventId"></param>
    /// <returns></returns>
    Task DeleteEvent(Guid eventId, DateTime dateEnd);
    
    /// <summary>
    /// привязка ивента к юзеру
    /// </summary>
    /// <param name="userId"></param>
    ///  <param name="eventId"></param>
    /// <returns></returns>
    Task<List<Guid>> BindEventToUser(List<Guid> userId, Guid eventId);

    /// <summary>
    /// привязка ивента к календарю
    /// </summary>
    /// <param name="calendarId"></param>
    /// <param name="eventId"></param>
    /// <returns></returns>
    Task<Guid> BindEventToCalendar(Guid calendarId, Guid eventId);

    /// <summary>
    /// получение массива ивентов по id юзеров
    /// </summary>
    /// <param name="idList"></param>
    /// <returns></returns>
    Task<List<EventDal>> GetEventListByIdList(List<Guid> idList);
    
    /// <summary>
    /// привязка ивента к переговорке
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="eventId"></param>
    /// <returns></returns>
    Task<Guid> BindEventToPlaceId(Guid userId, Guid eventId);

    /// <summary>
    /// Получение всех пользователей по eventId
    /// </summary>
    /// <param name="eventId"></param>
    /// <returns></returns>
    Task<List<UserDal>> GetALlUsersByEvent(Guid eventId);
    
    /// <summary>
    /// Получение события по eventId
    /// </summary>
    /// <param name="eventId"></param>
    /// <returns></returns>
    Task<EventDal> GetEventByEventId(Guid eventId);

}