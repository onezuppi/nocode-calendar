using System.Data;
using Dapper;

namespace Dal.Models.TypeHandlers;

/// <summary>
/// Преобразование в разные стороны EventRecurrence
/// </summary>
public class EventRecurrenceModelHandler : SqlMapper.TypeHandler<EventRecurrence>
{
    /// <inheritdoc />
    public override void SetValue(IDbDataParameter parameter, EventRecurrence value)
    {
        parameter.Value = JObject.FromObject(value).ToString();
    }

    /// <inheritdoc />
    public override EventRecurrence Parse(object value)
    {
        switch (value)
        {
            case null:
                return new EventRecurrence();
            case string valueString:
            {
                var serialize = JsonConvert.DeserializeObject<EventRecurrence>(valueString);
                return serialize;
            }
            default:
                return new EventRecurrence();
        }
    }
}