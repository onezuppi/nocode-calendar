using System.Data;
using Dapper;

namespace Dal.Models.TypeHandlers;

/// <summary>
/// Преобразование в разные стороны UserSettingsModel
/// </summary>
public class UserSettingsModelHandler : SqlMapper.TypeHandler<UserSettingsModel>
{
    /// <inheritdoc />
    public override void SetValue(IDbDataParameter parameter, UserSettingsModel value)
    {
        parameter.Value = JObject.FromObject(value).ToString();
    }

    /// <inheritdoc />
    public override UserSettingsModel Parse(object value)
    {
        if (value is null)
        {
            return new UserSettingsModel();
        }

        if (value is string valueString)
        {
            var serialize = JsonConvert.DeserializeObject<UserSettingsModel>(valueString);
            return serialize;
        }

        return new UserSettingsModel();
    }
}