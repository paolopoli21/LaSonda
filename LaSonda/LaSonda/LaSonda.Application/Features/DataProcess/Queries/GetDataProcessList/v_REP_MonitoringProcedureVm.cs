
namespace LaSonda.Application.Features.DataProcess.Queries.GetDataProcessList
{
    public class v_REP_MonitoringProcedureVm
    {
        public int IDCheck { get; set; }
        public string Nome { get; set; }
        public string Descrizione { get; set; }
        public int IDStato { get; set; }
        public string Stato { get; set; }
        public string Colore { get; set; }
        public DateTime? LastUpdate { get; set; }
        public string StoredProcedure { get; set; }
        public string Owner { get; set; }
    }
}
