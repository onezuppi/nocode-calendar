using System.Globalization;
using Core.Dapper.Extensions;
using Core.Dapper.Helpers;
using Dal.Models;
using Dal.Models.Enums;
using FluentMigrator;

namespace Dal.Migrations
{
    [Migration(202318111500)]
    public class Date_202318111500_AddTables : Migration
    {
        public override void Up()
        {
            var calendarTableName = DalMapper.TbName<CalendarDal>();
            if (!Schema.Table(calendarTableName).Exists())
            {
                Create.Table(calendarTableName)
                    .WithColumn(nameof(CalendarDal.Id)).AsPrimaryKeyGuidBased()
                    .WithColumn(nameof(EventDal.Color)).AsString(16).NotNullable()
                    .WithColumn(nameof(CalendarDal.Name)).AsString(50).NotNullable();
            }
            var userTableName = DalMapper.TbName<UserDal>();
            if (!Schema.Table(userTableName).Exists())
            {
                Create.Table(userTableName)
                    .WithColumn(nameof(UserDal.Id)).AsPrimaryKeyGuidBased()
                    .WithColumn(nameof(UserDal.Settings)).AsJson().Nullable()
                    .WithColumn(nameof(UserDal.Type)).AsEnum<UserTypes>().NotNullable()
                    .WithColumn(nameof(UserDal.Login)).AsString(50).Nullable()
                    .WithColumn(nameof(UserDal.MainCalendarId)).AsGuid().Nullable()
                    .WithColumn(nameof(UserDal.FullName)).AsString(50).Nullable();
            }
            var eventTableName = DalMapper.TbName<EventDal>();
            if (!Schema.Table(eventTableName).Exists())
            {
                Create.Table(eventTableName)
                    .WithColumn(nameof(EventDal.Id)).AsPrimaryKeyGuidBased()
                    .WithColumn(nameof(EventDal.Name)).AsString(50).NotNullable()
                    .WithColumn(nameof(EventDal.Description)).AsString(500).Nullable()
                    .WithColumn(nameof(EventDal.DateStartUtc)).AsDateTime().NotNullable()
                    .WithColumn(nameof(EventDal.DateEndUtc)).AsDateTime().NotNullable()
                    .WithColumn(nameof(EventDal.Color)).AsString(16).NotNullable()
                    .WithColumn(nameof(EventDal.EventRecurrence)).AsJson().Nullable()
                    .WithColumn(nameof(EventDal.PlaceId)).AsForeignKeyGuid<UserDal>().Nullable()
                    .WithColumn(nameof(EventDal.CalendarId)).AsForeignKeyGuid<CalendarDal>().NotNullable();
            }
            var calendarEventTableName = DalMapper.TbName<CalendarEventDal>();
            if (!Schema.Table(calendarEventTableName).Exists())
            {
                Create.Table(calendarEventTableName)
                    .WithColumn(nameof(CalendarEventDal.Id)).AsPrimaryKeyGuidBased()
                    .WithColumn(nameof(CalendarEventDal.EventId)).AsForeignKeyGuid<EventDal>().NotNullable()
                    .WithColumn(nameof(CalendarEventDal.CalendarId)).AsForeignKeyGuid<CalendarDal>().NotNullable();
                
                Execute.Sql($"CREATE UNIQUE INDEX IF NOT EXISTS \"calendar_to_event\" " +
                            $"ON public.{calendarEventTableName} USING btree (\"{nameof(CalendarEventDal.EventId)}\", \"{nameof(CalendarEventDal.CalendarId)}\")");
            }
            var userGroupTableName = DalMapper.TbName<UserGroupDal>();
            if (!Schema.Table(userGroupTableName).Exists())
            {
                Create.Table(userGroupTableName)
                    .WithColumn(nameof(UserGroupDal.Id)).AsPrimaryKeyGuidBased()
                    .WithColumn(nameof(UserGroupDal.Name)).AsString(50).NotNullable();
            }
            var userUserGroupTableName = DalMapper.TbName<UserUserGroupDal>();
            if (!Schema.Table(userUserGroupTableName).Exists())
            {
                Create.Table(userUserGroupTableName)
                    .WithColumn(nameof(UserUserGroupDal.Id)).AsPrimaryKeyGuidBased()
                    .WithColumn(nameof(UserUserGroupDal.UserId)).AsForeignKeyGuid<UserDal>().NotNullable()
                    .WithColumn(nameof(UserUserGroupDal.UserGroupId)).AsForeignKeyGuid<UserGroupDal>().NotNullable();
            }
            var userEventTableName = DalMapper.TbName<UserEventDal>();
            if (!Schema.Table(userEventTableName).Exists())
            {
                Create.Table(userEventTableName)
                    .WithColumn(nameof(UserEventDal.Id)).AsPrimaryKeyGuidBased()
                    .WithColumn(nameof(UserEventDal.UserId)).AsForeignKeyGuid<UserDal>().NotNullable()
                    .WithColumn(nameof(UserEventDal.EventId)).AsForeignKeyGuid<EventDal>().NotNullable();
                Execute.Sql($"CREATE UNIQUE INDEX IF NOT EXISTS \"user_to_event\" " +
                            $"ON public.{userEventTableName} USING btree (\"{nameof(UserEventDal.EventId)}\", \"{nameof(UserEventDal.UserId)}\")");
                // Execute.Sql($"CREATE UNIQUE INDEX \"PK_righttopagedal_PageId_RightId\" " +
                //             $"ON public.{userEvent} USING btree (\"{nameof(RightToPageDal.RightId)}\", \"{nameof(RightToPageDal.PageId)}\")" +
                //             $" WHERE {DalMapper.ColName("IsDeleted", rightToPageDal)} = {DalMapper.Bool(false)}");
            }
            var userCalendarTableName = DalMapper.TbName<UserCalendarDal>();
            if (!Schema.Table(userCalendarTableName).Exists())
            {
                Create.Table(userCalendarTableName)
                    .WithColumn(nameof(UserCalendarDal.Id)).AsPrimaryKeyGuidBased()
                    .WithColumn(nameof(UserCalendarDal.UserId)).AsForeignKeyGuid<UserDal>().NotNullable()
                    .WithColumn(nameof(UserCalendarDal.CalendarId)).AsForeignKeyGuid<CalendarDal>().NotNullable();
                
               
            }
        }

        public override void Down()
        {
            throw new NotImplementedException();
        }
    }
}
