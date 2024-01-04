using System.ComponentModel.DataAnnotations;

namespace LaSonda.Domain.Models.DataProcess
{
    public class v_REP_MonitoringResult
    {
        [Key]
        public int IDCheck { get; set; }
        public DateTime? ExecDate { get; set; }
        public int IsJSON { get; set; }
        public string Data { get; set; }
    }
}
