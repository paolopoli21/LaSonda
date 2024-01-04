
using MediatR;

namespace LaSonda.Application.Features.BackupSql.Queries.GetvBackupListAllServer
{
    public class GetvBackupListAllServerQuery : IRequest<List<v_BackupList_AllServerVm>>
    {
        public GetvBackupListAllServerQuery()
        {
        }
    }
}
