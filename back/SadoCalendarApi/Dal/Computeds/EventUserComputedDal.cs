using Dal.Models;
using Dapper.Contrib.Extensions;

namespace Dal.Computeds
{
    /// <summary>
    /// Модель <see cref="LkClientDal"/> с Computed полем настроек регистрации
    /// </summary>
    public class EventUserComputedDal : UserDal
    {
        [Computed]
        public List<UserDal> UserDalList { get; set; } = new List<UserDal>();
    }
}
