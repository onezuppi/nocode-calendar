
using Core.AppSettings.Services.Interfaces;

namespace Logic.Settings.Interfaces;

/// <summary>
/// Базовый класс настроек, общих для всех проектов, использующих сабмодуль Core
/// Данные настрйоки используеются для старта приложения
/// Их конфигурирвоания происходит через appsettings.json || .env файл
/// </summary>
public interface IAppSettingEnvService : IAppSettingEnvCoreService
{
        
}