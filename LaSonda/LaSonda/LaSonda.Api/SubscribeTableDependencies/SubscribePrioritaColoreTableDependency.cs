﻿using LaSonda.Api.Hubs;
using LaSonda.Domain.Models.DataProcess;
using TableDependency.SqlClient;

namespace LaSonda.Api.SubscribeTableDependencies
{
    public class SubscribePrioritaColoreTableDependency : ISubscribeTableDependency
    {
        SqlTableDependency<REP_PrioritaColori> tableDependency;
        DashboardHub dashboardHub;

        public SubscribePrioritaColoreTableDependency(DashboardHub dashboardHub)
        {
            this.dashboardHub = dashboardHub;
        }

        public void SubscribeTableDependency(string connectionString)
        {
            tableDependency = new SqlTableDependency<REP_PrioritaColori>(connectionString);
            tableDependency.OnChanged += TableDependency_OnChanged;
            tableDependency.OnError += TableDependency_OnError;
            tableDependency.Start();
        }

        private void TableDependency_OnChanged(object sender, TableDependency.SqlClient.Base.EventArgs.RecordChangedEventArgs<REP_PrioritaColori> e)
        {
            if (e.ChangeType != TableDependency.SqlClient.Base.Enums.ChangeType.None)
            {
                dashboardHub.SendPrioritaColori();
            }
        }

        private void TableDependency_OnError(object sender, TableDependency.SqlClient.Base.EventArgs.ErrorEventArgs e)
        {
            Console.WriteLine($"{nameof(REP_PrioritaColori)} SqlTableDependency error: {e.Error.Message}");
        }
    }
}
