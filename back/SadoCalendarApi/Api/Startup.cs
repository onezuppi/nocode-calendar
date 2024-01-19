using System.Reflection;
using Core;
using Core.AppSettings;
using Core.AppSettings.AppSettingsDb.Models;
using Dal;
using IdentityLib;
using Logic;
using Logic.Settings;
using Logic.Settings.Interfaces;
using MediatR;
using MultiTenant;
using SadoCommonLib;

namespace Api;

///
public class Startup
{
    private readonly IAppSettingEnvService _appSettingEnvService;

    ///
    public Startup(IAppSettingEnvService appSettingEnvService)
    {
        _appSettingEnvService = appSettingEnvService;
    }

    ///
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCoreServices(_appSettingEnvService);
        services.AddAppSettingsEnvWithReplaceCore<IAppSettingEnvService, AppSettingEnvService>();
        services.AddIdentityService();
        services.AddSadoServices(_appSettingEnvService);
        services.AddMultiTenantForService<AppSettingDbCoreModel>();
        services.AddLogicServices();
        services.AddMediatR(Assembly.GetExecutingAssembly());
        services.AddDalServices(_appSettingEnvService);
    }

    ///
    public void Configure(IApplicationBuilder app)
    {
        app.AddCoreMiddleware();
        app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
    }
}