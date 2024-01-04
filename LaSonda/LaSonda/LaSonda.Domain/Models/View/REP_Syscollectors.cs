using System.ComponentModel.DataAnnotations;

namespace LaSonda.Domain.Models.View
{
    public class REP_Syscollectors
    {
        [Key]
        public string ID_Wazuh { get; set; }
        public string Name { get; set; }
        public string IP { get; set; }
        public DateTime ScanDate { get; set; }
        public string JSON_Data { get; set; }
    }
}
