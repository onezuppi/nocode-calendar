using System.Linq.Expressions;
using CoreLib.Dapper.Di;
using Dal.Models;
using Dal.Models.Enums;
using Dal.Repositories.Interfaces;
using Logic.Managers.Interfaces;

namespace Logic.Managers;

/// <inheritdoc cref="Logic.Managers.Interfaces.IUserManager" />
public class EventManager : IEventManager
{
    private readonly IUserRepository _userRepository;
    private readonly ICalendarRepository _calendarRepository;
    private readonly IUserEventRepository _userEventRepository;
    private readonly IEventRepository _eventRepository;
    private readonly ICalendarEventRepository _calendarEventRepository;

    public EventManager(
        IUserRepository userRepository,
        ICalendarRepository calendarRepository,
        IUserEventRepository userEventRepository,
        IEventRepository eventRepository,
        ICalendarEventRepository calendarEventRepository
    )
    {
        _userRepository = userRepository;
        _calendarRepository = calendarRepository;
        _userEventRepository = userEventRepository;
        _eventRepository = eventRepository;
        _calendarEventRepository = calendarEventRepository;
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<Guid> CreateEvent(EventDal eventDal, List<Guid> userIdList, Guid calendarId, Guid? placeId)
    {
        var userList = (await _userRepository.GetAllAsync()).ToList();
        var calendarList = (await _calendarRepository.GetAllAsync()).ToList();

        if (userIdList.Any(id => userList.Select(x => x.Id).All(userId => userId != id)))
            throw new Exception("invalid userId list");
        if (calendarList.All(x => x.Id != calendarId))
            throw new Exception("invalid calendar id");
        if (placeId != null)
        {
            if (userList.Where(x => x.Type == UserTypes.MeetingRoom).All(x => x.Id != placeId))
                throw new Exception("invalid place id");
        }

        await _eventRepository.InsertOrUpdateAsync(GetEventDal(eventDal, placeId, calendarId), insertPrimaryKey: true);
        if (placeId != null)
        {
            await BindEventToPlaceId(placeId.Value, eventDal.Id);
        }

        await BindEventToUser(userIdList, eventDal.Id);
        await BindEventToCalendar(calendarId, eventDal.Id);

        return eventDal.Id;
    }

    public async Task<Guid> UpdateEvent(EventDal eventDal, List<Guid> userIdList, Guid calendarId, Guid? placeId)
    {
        var userList = (await _userRepository.GetAllAsync()).ToList();
        var calendarList = (await _calendarRepository.GetAllAsync()).ToList();
        var eventDalBefore = await _eventRepository.GetFirstOrDefaultAsync(nameof(EventDal.Id), eventDal.Id);

        if (userIdList.Any(id => userList.Select(x => x.Id).All(userId => userId != id)))
            throw new Exception("invalid userId list");
        if (calendarList.All(x => x.Id != calendarId))
            throw new Exception("invalid calendar id");
        if (placeId != null)
        {
            if (userList.Where(x => x.Type == UserTypes.MeetingRoom).All(x => x.Id != placeId))
                throw new Exception("invalid place id");
        }

        await _eventRepository.InsertOrUpdateAsync(GetEventDal(eventDal, placeId, calendarId), insertPrimaryKey: true);
        var userEventDals = await _userEventRepository.GetByFieldAsync(nameof(UserEventDal.EventId), eventDal.Id);
        var excludedUserList = userEventDals.Where(item => userIdList.All(userId => userId != item.UserId)).ToList();
        if (excludedUserList.Count > 0)
        {
            foreach (var excludeUser in excludedUserList)
            {
                await _userEventRepository.DeleteByFieldListAsync(new SearchFieldModel[]
                {
                    new(nameof(UserEventDal.EventId), eventDal.Id),
                    new(nameof(UserEventDal.UserId), excludeUser.UserId)
                });
                var mainCalendarIdUser = userList.First(userDalItem => userDalItem.Id == excludeUser.UserId);

                await _calendarEventRepository.DeleteByFieldListAsync(new SearchFieldModel[]
                {
                    new(nameof(CalendarEventDal.EventId), eventDal.Id),
                    new(nameof(CalendarEventDal.CalendarId), mainCalendarIdUser.MainCalendarId)
                });
            }
        }

        if (calendarId != eventDalBefore.CalendarId)
        {
            await _calendarEventRepository.DeleteByFieldListAsync(new SearchFieldModel[]
            {
                new(nameof(CalendarEventDal.EventId), eventDal.Id),
                new(nameof(CalendarEventDal.CalendarId), eventDalBefore.CalendarId)
            });
        }


        if (placeId != null)
        {
            if (placeId != eventDalBefore.PlaceId)
            {
                await _userEventRepository.DeleteByFieldListAsync(new SearchFieldModel[]
                {
                    new(nameof(UserEventDal.EventId), eventDal.Id),
                    new(nameof(UserEventDal.UserId), eventDalBefore.PlaceId)
                });
            }

            await BindEventToPlaceId(placeId.Value, eventDal.Id);
        }

        await BindEventToCalendar(calendarId, eventDal.Id);
        await BindEventToUser(userIdList, eventDal.Id);

        return eventDal.Id;
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task DeleteEvent(Guid eventId, DateTime dateEnd)
    {
        var currentEvent = await GetEventByEventId(eventId);
        if (currentEvent.EventRecurrence == null)
        {
            await _userEventRepository.DeleteByFieldListAsync(new SearchFieldModel[]
            {
                new(nameof(UserEventDal.EventId), eventId),
            });
            await _calendarEventRepository.DeleteByFieldListAsync(new SearchFieldModel[]
            {
                new(nameof(CalendarEventDal.EventId), eventId),
            });
            await _eventRepository.DeleteByFieldAsync(nameof(EventDal.Id), eventId);

            return;
        }

        currentEvent.EventRecurrence.DateEnd = dateEnd;
        await _eventRepository.InsertOrUpdateAsync(GetEventDal(currentEvent, currentEvent.PlaceId, currentEvent.CalendarId), insertPrimaryKey: true);
    }


    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<EventDal> GetEventByEventId(Guid eventId)
    {
        return await _eventRepository.GetFirstOrDefaultAsync(nameof(EventDal.Id), eventId);
    }


    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<List<EventDal>> GetEventListByIdList(List<Guid> idList)
    {
        return await _eventRepository.GetByFieldAsync(nameof(EventDal.Id), idList);
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<List<Guid>> BindEventToUser(List<Guid> userId, Guid eventId)
    {
        var dalList = userId
            .Select(value => new UserEventDal() { UserId = value, EventId = eventId })
            .ToList();

        var userEventArray = new Expression<Func<UserEventDal, object>>[]
        {
            val => val.EventId,
            val => val.UserId
        };

        var (created, updated) = await _userEventRepository.InsertOrUpdateByOneSqlAsync(dalList, true,
            userEventArray, fieldName: userEventArray);

        var userDalList = await _userRepository.GetByFieldAsync(nameof(UserDal.Id), userId);

        var calendarEventDalList = userDalList
            .Select(value => new CalendarEventDal() { CalendarId = value.MainCalendarId, EventId = eventId })
            .ToList();

        var calendarEventArray = new Expression<Func<CalendarEventDal, object>>[]
        {
            val => val.EventId,
            val => val.CalendarId
        };
        await _calendarEventRepository.InsertOrUpdateByOneSqlAsync(calendarEventDalList, true, calendarEventArray,
            fieldName: calendarEventArray);

        return created.Concat(updated).ToList();
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<Guid> BindEventToCalendar(Guid calendarId, Guid eventId)
    {
        var search = new SearchFieldModel[]
        {
            new(nameof(CalendarEventDal.EventId), eventId),
            new(nameof(CalendarEventDal.CalendarId), calendarId)
        };

        return await _calendarEventRepository.InsertOrUpdateAsync(new CalendarEventDal()
            { CalendarId = calendarId, EventId = eventId }, search);
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<Guid> BindEventToPlaceId(Guid userId, Guid eventId)
    {
        var search = new SearchFieldModel[]
        {
            new(nameof(UserEventDal.EventId), eventId),
            new(nameof(UserEventDal.EventId), userId)
        };

        return await _userEventRepository.InsertOrUpdateAsync(new UserEventDal() { UserId = userId, EventId = eventId },
            search);
        ;
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<List<UserDal>> GetALlUsersByEvent(Guid eventId)
    {
        return ((await _eventRepository.GetEventUserListOrDefaultAsync(eventId)).UserDalList ?? new List<UserDal>())
            .Where(x => x.Type == UserTypes.User)
            .ToList();
    }

    /// <summary>
    /// Создает новую модель EventDal
    /// </summary>
    /// <param name="eventDal"></param>
    /// <param name="placeId"></param>
    /// <param name="calendarId"></param>
    /// <returns></returns>
    private EventDal GetEventDal(EventDal eventDal, Guid? placeId, Guid calendarId)
    {
        return new EventDal
        {
            Id = eventDal.Id,
            Name = eventDal.Name,
            Description = eventDal.Description,
            DateEndUtc = eventDal.DateEndUtc,
            DateStartUtc = eventDal.DateStartUtc,
            PlaceId = placeId,
            Color = eventDal.Color,
            CalendarId = calendarId,
            EventRecurrence = eventDal.EventRecurrence
        };
    }
}