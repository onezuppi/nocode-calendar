using System.Text;
using CoreLib.Dapper.Di;
using Dal.Computeds;
using Dal.Models;
using Dal.Repositories.Interfaces;
using Ical.Net;
using Ical.Net.CalendarComponents;
using Ical.Net.DataTypes;
using Ical.Net.Serialization;
using Logic.Managers.Interfaces;

namespace Logic.Managers;

/// <inheritdoc cref="Logic.Managers.Interfaces.IUserManager" />
public class CalendarManager : ICalendarManager
{
    private readonly IUserRepository _userRepository;
    private readonly ICalendarRepository _calendarRepository;
    private readonly IUserCalendarRepository _userCalendarRepository;

    public CalendarManager(
        IUserRepository userRepository,
        ICalendarRepository calendarRepository,
        IUserCalendarRepository userCalendarRepository
    )
    {
        _userRepository = userRepository;
        _calendarRepository = calendarRepository;
        _userCalendarRepository = userCalendarRepository;
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<List<CalendarDal>> GetCalendarListByUserId(Guid userId, string? nameSearch)
    {
        var calendarUserIdList = await _userRepository.GetUserCalendarListOrDefaultAsync(userId);

        if (calendarUserIdList?.CalendarDalList == null)
        {
            return new List<CalendarDal>();
        }

        return calendarUserIdList.CalendarDalList
            .Where(x => nameSearch == null || x.Name.ToLowerInvariant().Contains(nameSearch.ToLowerInvariant()))
            .ToList();
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<List<CalendarDal>> GetCalendarList(string? nameSearch)
    {
        var calendarList = await _calendarRepository.GetAllAsync();

        return calendarList
            .Where(x => nameSearch == null || x.Name.ToLowerInvariant().Contains(nameSearch.ToLowerInvariant()))
            .ToList();
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<List<EventWithoutRecurrenceComputed>> GetEventList(Guid calendarId, DateTime from, DateTime to, string? nameSearch)
    {
        var calendarUserIdList = await _calendarRepository.GetCalendarEventListOrDefaultAsync(calendarId);
        var calendar = await GetByCalendarId(calendarId);
        var res = new List<EventWithoutRecurrenceComputed>();

        foreach (var eventDal in calendarUserIdList.EventDalList.Where(x => x != null))
        {
            var place = await _userRepository.GetFirstOrDefaultAsync(nameof(UserDal.Id), eventDal.PlaceId);
            if (eventDal.EventRecurrence == null && EventBetweenTwoDates(eventDal, from, to))
            {
                res.Add(GetComputedEvent(eventDal, place, calendar, eventDal.DateStartUtc, eventDal.DateEndUtc));
            }
            else if (eventDal.EventRecurrence != null)
            {
                var tempEventList = new List<EventWithoutRecurrenceComputed>();
                var currentDate = eventDal.DateStartUtc;
                var endDateCurrent = eventDal.DateEndUtc;
                while (!((currentDate < from && endDateCurrent < from)
                         || (currentDate > to && endDateCurrent > to)))
                {
                    tempEventList.Add(GetComputedEvent(eventDal, place, calendar, currentDate, endDateCurrent));
                    endDateCurrent = endDateCurrent.AddDays(eventDal.EventRecurrence.Interval);
                    currentDate = currentDate.AddDays(eventDal.EventRecurrence.Interval);
                }

                res.AddRange(tempEventList);
            }
        }

        return res
            .Where(x => nameSearch == null || x.Name.ToLowerInvariant().Contains(nameSearch.ToLowerInvariant()))
            .ToList();
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<Guid> CreateCalendar(Guid userId, string calendarName, string color)
    {
        var calendarList = (await _calendarRepository.GetAllAsync()).ToList();

        if (calendarList.Any(c => c.Name == calendarName))
            throw new Exception("calendar already exist");

        var calendarDal = new CalendarDal
        {
            Name = calendarName,
            Id = Guid.NewGuid(),
            Color = color
        };
        await _calendarRepository.InsertAsync(calendarDal, insertPrimaryKey: true);
        await _userCalendarRepository.InsertAsync(new UserCalendarDal
        {
            UserId = userId,
            CalendarId = calendarDal.Id
        });

        return calendarDal.Id;
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task DeleteCalendar(Guid calendarId)
    {
        var calendar = await _calendarRepository
                           .GetFirstOrDefaultByFieldAsync(nameof(CalendarDal.Id), calendarId) ??
                       throw new Exception("Invalid calendar id");

        await _calendarRepository.DeleteByFieldAsync(nameof(CalendarDal.Id), calendarId);
        await _userCalendarRepository.DeleteByFieldAsync(nameof(UserCalendarDal.CalendarId), calendarId);
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task UpdateCalendar(Guid calendarId, string? calendarName, string? calendarColor)
    {
        var calendar = await _calendarRepository
                           .GetFirstOrDefaultByFieldAsync(nameof(CalendarDal.Id), calendarId) ??
                       throw new Exception("Invalid calendar id");
        if (calendarName != null)
        {
            calendar.Name = calendarName;
        }

        if (calendarColor != null)
        {
            calendar.Color = calendarColor;
        }

        await _calendarRepository.UpdateAsync(calendar);
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<CalendarDal> GetByCalendarId(Guid calendarId)
    {
        return await _calendarRepository
            .GetFirstOrDefaultByFieldAsync(nameof(CalendarDal.Id), calendarId);
    }

    // <inheritdoc />
    [AbankingTransaction]
    public async Task<List<Guid>> BindCalendarToUser(Guid userId, List<Guid> calendarIdList)
    {
        var userCalendarIdList = (await _userCalendarRepository.GetByFieldAsync(nameof(UserCalendarDal.UserId), userId))
            .Select(x => x.CalendarId).ToList();
        var filteredRequestCalendarIdList = calendarIdList.Where(id => userCalendarIdList.All(userCalendarId => userCalendarId != id)).ToList();
        var userCalendarDalList = filteredRequestCalendarIdList.Select(id => new UserCalendarDal()
        {
            UserId = userId,
            CalendarId = id
        }).ToList();
        // НЕ РАБОТАЕТ ОДНИМ ЗАПРОСОМ СОХРАНЕНИЕ
        // var userEventArray = new Expression<Func<UserCalendarDal, object>>[]
        // {
        //     val => val.UserId,
        //     val => val.CalendarId
        // };
        // await _userCalendarRepository.InsertOrUpdateByOneSqlAsync(userCalendarDalList, true, userEventArray, fieldName: userEventArray);
        foreach (var userCalendar in userCalendarDalList)
        {
            await _userCalendarRepository.InsertAsync(userCalendar);
        }

        return userCalendarIdList.Concat(filteredRequestCalendarIdList).ToList();
    }

    // <inheritdoc />
    [AbankingTransaction]
    public async Task<List<Guid>> UnbindCalendarToUser(Guid userId, List<Guid> calendarIdList)
    {
        var userCalendarIdList = (await _userCalendarRepository.GetByFieldAsync(nameof(UserCalendarDal.UserId), userId))
            .Select(x => x.CalendarId).ToList();
        foreach (var calendarId in calendarIdList)
        {
            await _userCalendarRepository.DeleteByFieldAsync(nameof(UserCalendarDal.CalendarId), calendarId);
        }

        return userCalendarIdList.Where(id => !calendarIdList.Contains(id)).ToList();
    }

    // <inheritdoc />
    [AbankingTransaction]
    public async Task<byte[]> CreateCalendarToDownload(List<EventWithoutRecurrenceComputed> eventList)
    {
        var calendar = new Calendar();
        foreach (var eventItem in eventList)
        {
            calendar.Events.Add(new CalendarEvent
            {
                Class = "PUBLIC",
                Summary = eventItem.Name,
                Created = new CalDateTime(DateTime.Now),
                Start = new CalDateTime(eventItem.DateStartUtc),
                End = new CalDateTime(eventItem.DateEndUtc),
                Description = eventItem.Description,
            });
        }

        var serializer = new CalendarSerializer();
        var serializedCalendar = serializer.SerializeToString(calendar);
        var bytesCalendar = Encoding.UTF8.GetBytes(serializedCalendar);

        return bytesCalendar;
    }

    /// <summary>
    /// Проверка, что событие находится между from и to
    /// </summary>
    /// <param name="eventDal"></param>
    /// <param name="from"></param>
    /// <param name="to"></param>
    /// <returns></returns>
    private bool EventBetweenTwoDates(EventDal eventDal, DateTime from, DateTime to)
    {
        return !((eventDal.DateStartUtc < from && eventDal.DateEndUtc < from)
                 || (eventDal.DateStartUtc > to && eventDal.DateEndUtc > to));
    }

    /// <summary>
    /// Вычисляет computed модель ивента
    /// </summary>
    /// <param name="eventDal"></param>
    /// <param name="place"></param>
    /// <param name="calendar"></param>
    /// <param name="dateStart"></param>
    /// <param name="dateEnd"></param>
    /// <returns></returns>
    private EventWithoutRecurrenceComputed GetComputedEvent(EventDal eventDal, UserDal? place, CalendarDal calendar, DateTime dateStart, DateTime dateEnd)
    {
        return new EventWithoutRecurrenceComputed
        {
            Calendar = calendar,
            Color = eventDal.Color,
            DateStartUtc = dateStart,
            DateEndUtc = dateEnd,
            Description = eventDal.Description,
            Id = eventDal.Id,
            Name = eventDal.Name,
            Place = place
        };
    }
}