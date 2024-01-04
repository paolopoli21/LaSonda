
using System.ComponentModel.DataAnnotations;

namespace LaSonda.Application.Features.BackupSql.Queries.GetvBackupListAllServer
{
    public class v_BackupList_AllServerVm
    {
        public string ServerName { get; set; }
        public string Instance { get; set; }
        public string DbName { get; set; }
        public string BackupType { get; set; }
        public DateTime? BackupStartDate { get; set; }
    }
}
