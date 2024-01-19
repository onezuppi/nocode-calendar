namespace Dal.Models;

/// <summary>
/// Модель повтора события
/// </summary>
public class EventRecurrence
{
    /// <summary>
    /// Начало с которого будет повторятся событие
    /// </summary>
    public DateTime DateStart { get; set; }

    /// <summary>
    /// Когда событие перестало повторятся
    /// </summary>
    public DateTime? DateEnd { get; set; }

    /// <summary>
    /// Время между событиями в днях
    /// </summary>
    public long Interval { get; set; }
}