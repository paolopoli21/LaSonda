using LaSonda.Api.Hubs;
using LaSonda.Domain.Models.Monitoring;
using TableDependency.SqlClient;

namespace LaSonda.Api.SubscribeTableDependencies
{
    public class SubscribeMonLastUpdateTableDependency : ISubscribeTableDependency
    {
        SqlTableDependency<MON_LastUpdate> tableDependency;
        DashboardHub dashboardHub;

        public SubscribeMonLastUpdateTableDependency(DashboardHub dashboardHub)
        {
            this.dashboardHub = dashboardHub;
        }

        public void SubscribeTableDependency(string connectionString)
        {
            tableDependency = new SqlTableDependency<MON_LastUpdate>(connectionString);
            tableDependency.OnChanged += TableDependency_OnChanged;
            tableDependency.OnError += TableDependency_OnError;
            tableDependency.Start();

        }
        private void TableDependency_OnChanged(object sender, TableDependency.SqlClient.Base.EventArgs.RecordChangedEventArgs<MON_LastUpdate> e)
        {
            if (e.ChangeType != TableDependency.SqlClient.Base.Enums.ChangeType.None)
            {
                dashboardHub.SendMonitorings();
            }
        }

        private void TableDependency_OnError(object sender, TableDependency.SqlClient.Base.EventArgs.ErrorEventArgs e)
        {
            Console.WriteLine($"{nameof(MON_LastUpdate)} SqlTableDependency error: {e.Error.Message}");
        }

    }
}
