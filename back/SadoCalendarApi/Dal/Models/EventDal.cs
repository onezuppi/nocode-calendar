using Core.Dal.Base.Models;

namespace Dal.Models;

/// <summary>
/// Модель события у календаря
/// </summary>
public class EventDal : DalModelBase<Guid>
{
    /// <summary>
    /// Название события
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// Описание события
    /// </summary>
    public string Description { get; set; }

    /// <summary>
    /// Начало события, для рассчет длительности события
    /// </summary>
    public DateTime DateStartUtc { get; set; }

    /// <summary>
    /// Конец события, для рассчет длительности события
    /// </summary>
    public DateTime DateEndUtc { get; set; }
    
    /// <summary>
    /// guid переговорок
    /// </summary>
    public Guid? PlaceId { get; set; }
    
    /// <summary>
    /// guid календаря при создании встречи
    /// </summary>
    public Guid CalendarId { get; set; }
    
    /// <summary>
    /// Значение hex строки цвета
    /// </summary>
    public string Color { get; set; }

    /// <summary>
    /// Повтор события
    /// </summary>
    [CustomType(ColumnType.Json)]
    public EventRecurrence? EventRecurrence { get; set; }
}