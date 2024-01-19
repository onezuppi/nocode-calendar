using Core.AppSettings.Services.Interfaces;
using Core.Dapper.Extensions.ForStartup;
using Dal.Models.TypeHandlers;
using Dal.Repositories;
using Dal.Repositories.Interfaces;
using Dapper;
using Microsoft.Extensions.DependencyInjection;

namespace Dal;

public static class ForStartup
{
    public static IServiceCollection AddDalServices(this IServiceCollection services,
        IAppSettingEnvCoreService appSettingCoreService)
    {
        services.AddDapperCoreServices(appSettingCoreService);

        services.AddTransient<ICalendarRepository, CalendarRepository>();
        services.AddTransient<IEventRepository, EventRepository>();
        services.AddTransient<IUserGroupRepository, UserGroupRepository>();
        services.AddTransient<IUserRepository, UserRepository>();
        services.AddTransient<IUserCalendarRepository, UserCalendarRepository>();
        services.AddTransient<IUserEventRepository, UserEventRepository>();
        services.AddTransient<IUserUserGroupRepository, UserUserGroupRepository>();
        services.AddTransient<ICalendarEventRepository, CalendarEventRepository>();
        SqlMapper.AddTypeHandler(new UserSettingsModelHandler());
        SqlMapper.AddTypeHandler(new EventRecurrenceModelHandler());

        return services;
    }
}