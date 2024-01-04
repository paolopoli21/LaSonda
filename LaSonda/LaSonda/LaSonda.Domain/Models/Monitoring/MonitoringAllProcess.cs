using System.ComponentModel.DataAnnotations;

namespace LaSonda.Domain.Models.Monitoring
{
    public class MonitoringAllProcess
    {
        [Key]
        public string processname { get; set; }
        public string instance { get; set; }
        public string runduration { get; set; }
        public string executionstatus { get; set; }
        public DateTime? LastRun { get; set; }
        public DateTime? NextRun { get; set; }
        public int? CheckProcess { get; set; }
        public string Colore { get; set; }
    }
}
