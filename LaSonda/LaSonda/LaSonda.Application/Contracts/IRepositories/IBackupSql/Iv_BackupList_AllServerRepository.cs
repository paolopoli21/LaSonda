
using LaSonda.Application.Contracts.IRepositories.Common;
using LaSonda.Domain.Models.BackupSql;

namespace LaSonda.Application.Contracts.IRepositories.IBackupSql
{
    public interface Iv_BackupList_AllServerRepository : IBaseSimpleRepository<v_BackupList_AllServer>
    {
        Task<IEnumerable<v_BackupList_AllServer>> GetAllBackups();
    }
}
