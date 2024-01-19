using Api.Controllers.Public.User.Dto.Response;
using AutoMapper;
using Dal.Computeds;
using Dal.Models;

namespace Api.Controllers.Public.User.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<UserDal, GetUserResponse>();
        CreateMap<UserSettingsModel, UserSettingsResponse>();
        CreateMap<UserSettingsResponse, UserSettingsModel>();
        CreateMap<UserGroupUserComputedDal, GetUserGroupsResponse>()
            .ForMember(to => to.UserList, src => src.MapFrom(from => from.UserDalList));
    }
}