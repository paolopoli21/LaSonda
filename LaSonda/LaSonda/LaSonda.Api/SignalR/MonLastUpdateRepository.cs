using LaSonda.Domain.Models.Monitoring;
using System.Data;

namespace LaSonda.Api.SignalR
{
    public class MonLastUpdateRepository
    {
        string connectionString;

        public MonLastUpdateRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public List<MON_LastUpdate> GetMonLastDate()
        {
            List<MON_LastUpdate> monLastUpdateList = new List<MON_LastUpdate>();
            monLastUpdateList = GetMonLastUpdateDetailsFromDb();
            return monLastUpdateList;
        }

        private List<MON_LastUpdate> GetMonLastUpdateDetailsFromDb()
        {
            return new List<MON_LastUpdate>();
        }
    }
}

