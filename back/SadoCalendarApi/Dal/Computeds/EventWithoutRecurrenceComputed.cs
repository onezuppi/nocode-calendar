using Dal.Models;

namespace Dal.Computeds;

/// <summary>
/// Соыбыте без повтора
/// </summary>
public class EventWithoutRecurrenceComputed
{
    /// <summary>
    /// Id события
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Имя события
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// Описание события
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Дата начла события
    /// </summary>
    public DateTime DateStartUtc { get; set; }

    /// <summary>
    /// Дата конца события
    /// </summary>
    public DateTime DateEndUtc { get; set; }

    /// <summary>
    /// Место события
    /// </summary>
    public UserDal? Place { get; set; }

    /// <summary>
    /// Цвет события
    /// </summary>
    public string Color { get; set; }

    /// <summary>
    /// Календарь
    /// </summary>
    public CalendarDal Calendar { get; set; }
}