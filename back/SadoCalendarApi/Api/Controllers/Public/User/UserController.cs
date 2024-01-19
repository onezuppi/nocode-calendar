using Api.Controllers.Public.User.Dto.Request;
using Api.Controllers.Public.User.Dto.Response;
using AutoMapper;
using Core.Api.Controllers.Base;
using Core.Api.Response;
using Dal.Models;
using Logic.Managers.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SadoCommonLib.SadoIdentity.Polices;
using SadoCommonLib.SadoIdentity.Services.Interfaces;

namespace Api.Controllers.Public.User;

/// <summary>
/// Работа с пользователями и с группами пользователей
/// </summary>
[Route("client/public/user")]
[ApiVersion("1.0")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = RequireClientPolice.Name)]
public class UserController : BasePublicController
{
    private readonly ISadoIdentityService _sadoIdentityService;
    private readonly IUserManager _userManager;
    private readonly IMapper _mapper;

    public UserController(
        ISadoIdentityService sadoIdentityService,
        IUserManager userManager,
        IMapper mapper
    )
    {
        _sadoIdentityService = sadoIdentityService;
        _userManager = userManager;
        _mapper = mapper;
    }

    /// <summary>
    /// Получение информации о текущем юзере
    /// </summary>
    /// <returns>Информация по учетной записи</returns>
    [HttpGet("info")]
    [ProducesResponseType(typeof(GetUserResponse), 200)]
    public async Task<IActionResult> GetAccountInfoAsync()
    {
        var userId = _sadoIdentityService.GetIdentityUserId();
        var userDal = await _userManager.GetUserAfterCheckExistOrCreate(userId);
        var userResponse = _mapper.Map<GetUserResponse>(userDal);

        return new JsonResultWithSetting(userResponse, 200, true);
    }

    /// <summary>
    /// Поулчение списка пользователей
    /// </summary>
    /// <returns>Информация по учетной записи</returns>
    [HttpGet("list")]
    [ProducesResponseType(typeof(List<GetUserResponse>), 200)]
    public async Task<IActionResult> GetUserListAsync([FromQuery] string? fullNameSearch)
    {
        var userDalList = await _userManager.GetUserList(fullNameSearch);
        var userResponse = _mapper.Map<List<GetUserResponse>>(userDalList);

        return new JsonResultWithSetting(userResponse, 200, true);
    }

    /// <summary>
    /// Обновление настроек поьзователя
    /// </summary>
    /// <returns>Информация по учетной записи</returns>
    [HttpPost("settings")]
    [ProducesResponseType(200)]
    public async Task<IActionResult> UpdateUserSettings([FromBody] UpdateUserSettingsRequest request)
    {
        var userId = _sadoIdentityService.GetIdentityUserId();
        await _userManager.UpdateUserSettings(userId, _mapper.Map<UserSettingsResponse, UserSettingsModel>(request.Settings));

        return Ok();
    }

    /// <summary>
    /// Создание переговорной комнаты
    /// </summary>
    /// <returns>Информация по учетной записи</returns>
    [HttpPost("place")]
    [ProducesResponseType(typeof(CreatePlaceResponse), 200)]
    public async Task<IActionResult> CreatePlace([FromBody] CreatePlaceRequest request)
    {
        var placeId = await _userManager.CreatePlace(request.Name);

        return new JsonResultWithSetting(new CreatePlaceResponse { Id = placeId }, 200, true);
    }

    /// <summary>
    /// Создание группы пользователей
    /// </summary>
    /// <returns>Информация по учетной записи</returns>
    [HttpPost("group")]
    [ProducesResponseType(typeof(CreateUserGroupResponse), 200)]
    public async Task<IActionResult> CreateUserGroup([FromBody] CreateUserGroupRequest request)
    {
        var userGroupId = await _userManager.CreateUserGroup(request.Name, request.UserGuidList);

        return new JsonResultWithSetting(new CreateUserGroupResponse { Id = userGroupId }, 200, true);
    }

    /// <summary>
    /// Изменить группу пользователей
    /// </summary>
    /// <returns>Информация по учетной записи</returns>
    [HttpPost("group/edit")]
    [ProducesResponseType(typeof(EditUserGroupResponse), 200)]
    public async Task<IActionResult> EditUserGroup([FromBody] EditUserGroupRequest request)
    {
        var userGroupId = await _userManager.EditUserGroup(request.GroupId, request.UserGuidList);

        return new JsonResultWithSetting(new EditUserGroupResponse { Id = userGroupId }, 200, true);
    }

    /// <summary>
    /// Получение всех групп пользоватлеей
    /// </summary>
    /// <returns>Информация по учетной записи</returns>
    [HttpGet("groups")]
    [ProducesResponseType(typeof(List<GetUserGroupsResponse>), 200)]
    public async Task<IActionResult> GetUserGroups()
    {
        var userGroupUserComputedDalList = await _userManager.GetUserGroupList();
        var response = _mapper.Map<List<GetUserGroupsResponse>>(userGroupUserComputedDalList);

        return new JsonResultWithSetting(response, 200, true);
    }
    
    /// <summary>
    /// Удаление пользователя по id
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(200)]
    public async Task<IActionResult> DeleteUserById([FromRoute] Guid id)
    {
        await _userManager.DeleteUserById(id);

        return Ok();
    }
}