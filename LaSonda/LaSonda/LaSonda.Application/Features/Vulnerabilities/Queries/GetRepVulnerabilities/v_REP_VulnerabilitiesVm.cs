namespace LaSonda.Application.Features.Vulnerabilities.Queries.GetRepVulnerabilities
{
    public class v_REP_VulnerabilitiesVm
    {
        public string? ID_Wazuh { get; set; }
        public string? Name { get; set; }
        public string? IP { get; set; }
        public DateTime? ScanDate { get; set; }
        public int? AffectedItems { get; set; }
        public string? JSONData { get; set; }

    }
}
