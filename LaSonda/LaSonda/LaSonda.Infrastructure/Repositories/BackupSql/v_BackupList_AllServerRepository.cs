using LaSonda.Application.Contracts.IRepositories.IBackupSql;
using LaSonda.Domain.Models.BackupSql;
using LaSonda.Infrastructure.Repositories.Common;
using LaSonda.Infrastructure.Service;
using Microsoft.EntityFrameworkCore;

namespace LaSonda.Infrastructure.Repositories.BackupSql
{
    public class v_BackupList_AllServerRepository : BaseSimpleRepository<v_BackupList_AllServer>, Iv_BackupList_AllServerRepository
    {
        public v_BackupList_AllServerRepository(LaSondaDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<v_BackupList_AllServer>> GetAllBackups()
        {
            return await _Context.v_BackupList_AllServer.ToListAsync();
        }
    }
}
