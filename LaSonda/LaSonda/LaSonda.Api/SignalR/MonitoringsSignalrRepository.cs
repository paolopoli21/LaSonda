using LaSonda.Domain.Models.Monitoring;
using LaSonda.Infrastructure.Service;
using System.Data;
using System.Data.SqlClient;

namespace LaSonda.Api.SignalR
{
    public class MonitoringsSignalrRepository
    {
        string connectionString;
        public MonitoringsSignalrRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public List<MonitoringAllProcess> GetMonitoringList()
        {
            List<MonitoringAllProcess> monitoringList = new List<MonitoringAllProcess>();
            monitoringList = GetMonitoringDetailsFromDb();
            return monitoringList;
        }

        private List<MonitoringAllProcess> GetMonitoringDetailsFromDb()
        {

            var query = "EXEC sp_MonitoringAllProcess";
            var monitoringList = new List<MonitoringAllProcess>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();  
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.CommandType = CommandType.Text;
                        command.ExecuteNonQuery();
                        //command.CommandText = query;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var monitoring = new MonitoringAllProcess();
                                monitoring.instance = reader["instance"].ToString();
                                monitoring.processname = reader["processname"].ToString();
                                monitoring.runduration = reader["runduration"].ToString();
                                monitoring.executionstatus = reader["executionstatus"].ToString();
                                if (!string.IsNullOrWhiteSpace(reader["LastRun"].ToString()))
                                {
                                    monitoring.LastRun = Convert.ToDateTime(reader["LastRun"].ToString());
                                }
                                if (!string.IsNullOrWhiteSpace(reader["NextRun"].ToString()))
                                {
                                    monitoring.NextRun = Convert.ToDateTime(reader["NextRun"].ToString());
                                }
                                monitoring.CheckProcess = Convert.ToInt32(reader["CheckProcess"].ToString());
                                monitoring.Colore = reader["Colore"].ToString();
                                monitoringList.Add(monitoring);
                            }

                        }
                    }
                    return monitoringList;
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }
}
