namespace LaSonda.Application.Features.Collectors.Queries
{
    public class REP_SyscollectorsVm
    {
        public string ID_Wazuh { get; set; }
        public string Name { get; set; }
        public string IP { get; set; }
        public DateTime ScanDate { get; set; }
        public string JSON_Data { get; set; }

    }
}
