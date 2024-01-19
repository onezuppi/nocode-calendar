using Logic.Managers;
using Logic.Managers.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Logic;

public static class ForStartup
{
    public static IServiceCollection AddLogicServices(this IServiceCollection services)
    {
        services.TryAddTransient<IUserManager, UserManager>();
        services.TryAddTransient<ICalendarManager, CalendarManager>();
        services.TryAddTransient<IEventManager, EventManager>();

        return services;
    }
}