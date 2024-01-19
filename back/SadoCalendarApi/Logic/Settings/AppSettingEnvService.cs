using Core.AppSettings.Services;
using Logic.Settings.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Logic.Settings;

/// <inheritdoc cref="IAppSettingEnvService"/>
public class AppSettingEnvService : AppSettingEnvCoreService, IAppSettingEnvService
{
    private readonly IConfiguration _configuration;
    
    public AppSettingEnvService(IConfiguration configuration) : base(configuration, RabbitMqMember.CalendarApi)
    {
        _configuration = configuration;
    }
}