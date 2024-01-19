using Dal.Models;
using Dapper.Contrib.Extensions;

namespace Dal.Computeds
{
    /// <summary>
    /// Модель <see cref="LkClientDal"/> с Computed полем настроек регистрации
    /// </summary>
    public class UserCalendarComputedDal : UserDal
    {
        [Computed]
        public List<CalendarDal> CalendarDalList { get; set; } = new List<CalendarDal>();
    }
}
