using System.ComponentModel.DataAnnotations;

namespace LaSonda.Domain.Models.View
{
    public class v_REP_Vulnerabilities
    {
        public string? ID_Wazuh { get; set; }
        public string? Name { get; set; }
        public string? IP { get; set; }
        public DateTime? ScanDate { get; set; }
        public int? AffectedItems { get; set; }
        public string? JSONData { get; set; }
    }
}
