using CoreLib.Dapper.Di;
using Dal.Computeds;
using Dal.Models;
using Dal.Models.Enums;
using Dal.Repositories.Interfaces;
using IdentityLib.Default.Request.Users;
using IdentityLib.Services.Interfaces;
using Logic.Managers.Interfaces;
using SadoCommonLib.SadoIdentity.Services.Interfaces;

namespace Logic.Managers;

/// <inheritdoc cref="Logic.Managers.Interfaces.IUserManager" />
public class UserManager : IUserManager
{
    private readonly IUserRepository _userRepository;
    private readonly ICalendarRepository _calendarRepository;
    private readonly IUserCalendarRepository _userCalendarRepository;
    private readonly IUserGroupRepository _userGroupRepository;
    private readonly IUserUserGroupRepository _userUserGroupRepository;
    private readonly ISadoIdentityService _sadoIdentityService;
    private readonly IIdentityConnectionService _identityConnectionService;
    private readonly IUserEventRepository _userEventRepository;

    public UserManager(
        IUserRepository userRepository,
        ICalendarRepository calendarRepository,
        IUserCalendarRepository userCalendarRepository,
        IUserGroupRepository userGroupRepository,
        IUserUserGroupRepository userUserGroupRepository,
        ISadoIdentityService sadoIdentityService,
        IIdentityConnectionService identityConnectionService,
        IUserEventRepository userEventRepository
    )
    {
        _userRepository = userRepository;
        _calendarRepository = calendarRepository;
        _userCalendarRepository = userCalendarRepository;
        _userGroupRepository = userGroupRepository;
        _userUserGroupRepository = userUserGroupRepository;
        _sadoIdentityService = sadoIdentityService;
        _identityConnectionService = identityConnectionService;
        _userEventRepository = userEventRepository;
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<UserDal> GetUserAfterCheckExistOrCreate(Guid userId)
    {
        var clientUser = await _identityConnectionService.GetUserByIdAsync(new GetUserByIdRabbitRequest(userId));
        var calendarUser = await _userRepository.GetFirstOrDefaultAsync(nameof(UserDal.Id), clientUser.Id);

        if (calendarUser != null)
            return calendarUser;

        var fullName = _sadoIdentityService.GetClientFio();
        var calendarDal = new CalendarDal
        {
            Name = fullName,
            Id = Guid.NewGuid(),
            Color = "FFFFFF"
        };
        await _calendarRepository.InsertAsync(calendarDal, insertPrimaryKey: true);
        var userDal = new UserDal
        {
            Id = clientUser.Id,
            Type = UserTypes.User,
            FullName = fullName,
            Login = clientUser.UserName,
            MainCalendarId = calendarDal.Id,
            Settings = new UserSettingsModel
            {
                SelectedTabEnum = SelectedTabs.Week,
                SelectedCalendarIdList = new List<Guid>
                {
                    calendarDal.Id
                }
            },
        };
        await _userRepository.InsertAsync(userDal, insertPrimaryKey: true);
        await _userCalendarRepository.InsertAsync(new UserCalendarDal
        {
            CalendarId = calendarDal.Id,
            UserId = userDal.Id
        });

        return userDal;
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<List<UserDal>> GetUserList(string? fullNameSearch)
    {
        return (await _userRepository.GetAllAsync())
            .Where(x => fullNameSearch == null || x.FullName.ToLowerInvariant().Contains(fullNameSearch.ToLowerInvariant()))
            .ToList();
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task UpdateUserSettings(Guid userId, UserSettingsModel settings)
    {
        var user = await _userRepository
            .GetFirstOrDefaultAsync(nameof(UserDal.Id), userId) ?? throw new Exception("user dont created");
        user.Settings = settings;

        await _userRepository.UpdateAsync(user);
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<Guid> CreateUserGroup(string userGroupName, List<Guid> userIdList)
    {
        var userGroupList = (await _userGroupRepository.GetAllAsync()).ToList();
        var userList = (await _userRepository.GetAllAsync()).ToList();

        if (userGroupList.Any(group => group.Name.SequenceEqual(userGroupName)))
            throw new Exception("UserGroup already exist");

        if (userIdList.Any(userId => userList.All(user => user.Id != userId)))
            throw new Exception("Invalid userIdList");

        var userGroupDal = new UserGroupDal
        {
            Id = Guid.NewGuid(),
            Name = userGroupName
        };
        await _userGroupRepository.InsertAsync(userGroupDal, insertPrimaryKey: true);

        var userGroupDals = userIdList
            .Select(userId => new UserUserGroupDal()
            {
                UserGroupId = userGroupDal.Id,
                UserId = userId
            }).ToList();
        await _userUserGroupRepository.InsertOrUpdateAsync(userGroupDals);

        return userGroupDal.Id;
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<Guid> CreatePlace(string placeName)
    {
        var userList = (await _userRepository.GetAllAsync()).ToList();

        if (userList.Where(x => x.Type == UserTypes.MeetingRoom).Any(x => x.Login.SequenceEqual(placeName)))
            throw new Exception("meetingRoom already created");
        var calendarDal = new CalendarDal
        {
            Name = placeName,
            Id = Guid.NewGuid(),
            Color = "3333333"
        };
        var meetingRoom =
            await _userRepository.InsertAsync(new UserDal
            {
                Login = placeName,
                Type = UserTypes.MeetingRoom,
                MainCalendarId = calendarDal.Id
            });
        await _calendarRepository.InsertAsync(calendarDal, insertPrimaryKey: true);
        await _userCalendarRepository.InsertAsync(new UserCalendarDal
        {
            CalendarId = calendarDal.Id,
            UserId = meetingRoom
        });

        return meetingRoom;
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<Guid> EditUserGroup(Guid userGroupId, List<Guid> userIdList)
    {
        var userList = (await _userRepository.GetAllAsync()).ToList();
        var userGroup = await _userGroupRepository
                            .GetFirstOrDefaultAsync(nameof(UserGroupDal.Id), userGroupId) ??
                        throw new Exception("userGroup dont created");

        if (userIdList.Any(userId => userList.All(user => user.Id != userId)))
            throw new Exception("Invalid userIdList");

        await _userUserGroupRepository.DeleteByFieldAsync(nameof(UserUserGroupDal.UserGroupId), userGroupId);

        var userGroupDals = userIdList
            .Select(userId => new UserUserGroupDal()
            {
                UserGroupId = userGroupId,
                UserId = userId
            })
            .ToList();
        await _userUserGroupRepository.InsertOrUpdateAsync(userGroupDals);

        return userGroup.Id;
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<List<UserGroupUserComputedDal>> GetUserGroupList()
    {
        var userGroupList = (await _userGroupRepository.GetAllAsync()).ToList();
        var result = new List<UserGroupUserComputedDal>();

        foreach (var userGroup in userGroupList)
        {
            var userGroupUsers = await _userGroupRepository.GetUserGroupUserListOrDefaultAsync(userGroup.Id);
            userGroupUsers.UserDalList = userGroupUsers.UserDalList.Where(x => x != null).ToList();
            result.Add(userGroupUsers);
        }

        return result;
    }

    /// <inheritdoc />
    [AbankingTransaction]
    public async Task<UserDal> GetUserById(Guid userId)
    {
        return await _userRepository.GetFirstOrDefaultAsync(nameof(UserDal.Id), userId);
    }

    // <inheritdoc />
    [AbankingTransaction]
    public async Task DeleteUserById(Guid userId)
    {
        await _userRepository.DeleteByFieldAsync(nameof(UserDal.Id), userId);
        await _userUserGroupRepository.DeleteByFieldAsync(nameof(UserUserGroupDal.UserId), userId);
        await _userCalendarRepository.DeleteByFieldAsync(nameof(UserCalendarDal.UserId), userId);
        await _userEventRepository.DeleteByFieldAsync(nameof(UserEventDal.UserId), userId);
    }
}