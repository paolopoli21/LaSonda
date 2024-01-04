
using System.ComponentModel.DataAnnotations;

namespace LaSonda.Domain.Models.BackupSql
{
    //[Keyless]
    public class v_BackupList_AllServer
    {

        //[Key]
        public string ServerName { get; set; }
        public string Instance { get; set; }
        public string DbName { get; set; }
        public string BackupType { get; set; }
        public DateTime? BackupStartDate { get; set; }
    }
}
