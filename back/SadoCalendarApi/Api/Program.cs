using Core;
using Logic.Settings;

namespace Api;

public class Program
{
    public static async Task Main(string[] args)
    {
        var host = await CoreForStartupExtension.CreateHostBuilderAsync<Startup, AppSettingEnvService>(args);
        await host.Host.RunAsync();
    }
}