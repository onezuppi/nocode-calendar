using Dal.Computeds;
using Dal.Models;

namespace Logic.Managers.Interfaces;

/// <summary>
/// Менеджер по работе с пользователями
/// </summary>
public interface ICalendarManager
{
    /// <summary>
    /// Получает список календарей по id пользователя
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<List<CalendarDal>> GetCalendarListByUserId(Guid userId, string? nameSearch = null);
    
    /// <summary>
    /// Получает список всех календарей
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<List<CalendarDal>> GetCalendarList(string? nameSearch = null);

    /// <summary>
    /// Создание нового календаря
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="calendarName"></param>
    /// <returns></returns>
    Task<Guid> CreateCalendar(Guid userId, string calendarName, string color);

    /// <summary>
    /// получение календаря по ID
    /// </summary>
    /// <param name="calendarId"></param>
    /// <returns></returns>
    Task<CalendarDal> GetByCalendarId(Guid calendarId);

    /// <summary>
    /// Привязка каклендарей к пользователю
    /// </summary>
    /// <param name="calendarIdList"></param>
    /// <returns></returns>
    Task<List<Guid>> BindCalendarToUser(Guid userId, List<Guid> calendarIdList);
    
    /// <summary>
    /// Отвязать каклендари от пользователя
    /// </summary>
    /// <param name="calendarIdList"></param>
    /// <returns></returns>
    Task<List<Guid>> UnbindCalendarToUser(Guid userId, List<Guid> calendarIdList);

    /// <summary>
    /// Удаление календаря
    /// </summary>
    /// <param name="calendarId"></param>
    /// <returns></returns>
    Task DeleteCalendar(Guid calendarId);

    /// <summary>
    /// Изменение календаря
    /// </summary>
    /// <param name="calendarId"></param>
    /// <returns></returns>
    Task UpdateCalendar(Guid calendarId, string? calendarName, string? calendarColor);

    /// <summary>
    /// Получение списка событий
    /// </summary>
    /// <param name="calendarId"></param>
    /// <param name="from"></param>
    /// <param name="to"></param>
    /// <param name="nameSearch"></param>
    /// <returns></returns>
    Task<List<EventWithoutRecurrenceComputed>> GetEventList(Guid calendarId, DateTime from, DateTime to, string? nameSearch = null);

    /// <summary>
    /// Создать календарь для скачивания
    /// </summary>
    /// <param name="eventList"></param>
    /// <returns></returns>
    Task<byte[]> CreateCalendarToDownload(List<EventWithoutRecurrenceComputed> eventList);
}