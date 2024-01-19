using Dal.Models;
using Dapper.Contrib.Extensions;

namespace Dal.Computeds
{
    /// <summary>
    /// Модель <see cref="LkClientDal"/> с Computed полем настроек регистрации
    /// </summary>
    public class CalendarEventComputedDal : CalendarDal
    {
        [Computed]
        public List<EventDal> EventDalList { get; set; } = new List<EventDal>();
    }
}
