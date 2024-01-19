using Core.Dal.Base.Models;
using Dal.Models.Enums;

namespace Dal.Models;

/// <summary>
/// Модель календаря
/// </summary>
public class CalendarDal : DalModelBase<Guid>
{
    /// <summary>
    /// Имя календаря
    /// </summary>
    public string Name { get; set; }
    
    /// <summary>
    /// Значение hex строки цвета
    /// </summary>
    public string Color { get; set; }
}