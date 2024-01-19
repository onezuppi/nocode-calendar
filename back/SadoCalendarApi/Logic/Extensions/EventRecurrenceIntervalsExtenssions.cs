using Dal.Models.Enums;

namespace Logic.Extensions;

public static class EventRecurrenceIntervalsExtensions
{
    /// <summary>
    /// Получение количества дней по интервалу
    /// </summary>
    /// <param name="interval"></param>
    /// <param name="startDate"></param>
    /// <returns></returns>
    public static int GetInterval(this EventRecurrenceIntervals interval, DateTime startDate)
    {
        if (interval == EventRecurrenceIntervals.Day)
        {
            return 1;
        }
        if (interval == EventRecurrenceIntervals.Week)
        {
            return 7;
        }
        if (interval == EventRecurrenceIntervals.Month)
        {
            return DateTime.DaysInMonth(startDate.Year, startDate.Month);
        }

        return Enumerable.Range(0, 12).Sum(interval =>
        {
            var currentMonth = startDate.Month + interval - 1;
            var currentYear = startDate.Year;
            if (currentMonth > 12)
            {
                currentYear += 1;
            }

            return DateTime.DaysInMonth(currentYear, currentMonth % 12 + 1);
        });
    }
}