using Core.Dal.Base.Repositories;
using Core.Dapper.ConnectionFactories.Interfaces;
using Core.Dapper.Helpers;
using Dal.Computeds;
using Dal.Models;
using Dal.Repositories.Interfaces;
using Dapper;

namespace Dal.Repositories;

/// <inheritdoc cref="Dal.Repositories.Interfaces.IUserGroupRepository" />
internal class UserGroupRepository : Repository<UserGroupDal, Guid>, IUserGroupRepository
{
    public UserGroupRepository(IDbConnectionFactory dbConnectionFactory) : base(dbConnectionFactory)
    {
    }

    public async Task<UserGroupUserComputedDal> GetUserGroupUserListOrDefaultAsync(Guid userGroupId)
    {
        var sql = $" SELECT * FROM {DalMapper.TbName<UserGroupDal>()} " +
                  $" LEFT JOIN {DalMapper.TbName<UserUserGroupDal>()} " +
                  $" ON {DalMapper.ColName<UserGroupDal>(q => q.Id)} = {DalMapper.ColName<UserUserGroupDal>(q => q.UserGroupId)} " +
                  $" LEFT JOIN {DalMapper.TbName<UserDal>()} " +
                  $" ON {DalMapper.ColName<UserDal>(q => q.Id)} = {DalMapper.ColName<UserUserGroupDal>(q => q.UserId)} "
                  + $"WHERE {DalMapper.ColName<UserGroupDal>(q => q.Id)} = {DalMapper.ParameterPrefix}{nameof(userGroupId)}";

        UserGroupUserComputedDal userGroupUserComputedDal = null;
        await Connection.QueryAsync<UserGroupUserComputedDal, UserUserGroupDal, UserDal, UserGroupUserComputedDal>(sql,
            (dal, userGroupUserDal, userDal) =>
            {
                userGroupUserComputedDal ??= dal;

                if (!userGroupUserComputedDal.UserDalList.Exists(value => value.Id == userDal.Id))
                {
                    userGroupUserComputedDal.UserDalList.Add(userDal);
                }

                return dal;
            }, new { userGroupId });

        return userGroupUserComputedDal;
    }
}