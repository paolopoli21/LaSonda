using LaSonda.Domain.Models.DataProcess;
using System.Data;
using System.Data.SqlClient;
using System;
namespace LaSonda.Api.SignalR
{
    public class PrioritaColoriRepository
    {
        string connectionString;

        public PrioritaColoriRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public List<REP_PrioritaColori> GetPrioritaColoriList()
        {
            List<REP_PrioritaColori> prioritaColoriList = new List<REP_PrioritaColori>();
            REP_PrioritaColori prioritaColore;
            
            prioritaColoriList = GetPrioritaColoriDetailsFromDb();
            return prioritaColoriList;
        }

        private List<REP_PrioritaColori> GetPrioritaColoriDetailsFromDb()
        {
            var query = @"SELECT [IDPriorita], [Descrizione], [colore] FROM [dbo].[REP_PrioritaColori]";
            DataTable dataTable = new DataTable();
            var prioritaColoriList = new List<REP_PrioritaColori>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.CommandType = CommandType.Text;
                        //command.CommandText = query;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var prioritaColore = new REP_PrioritaColori();
                                prioritaColore.IDPriorita = Convert.ToInt32(reader["IDPriorita"]);
                                prioritaColore.Descrizione = reader["Descrizione"].ToString();
                                prioritaColore.Colore = reader["colore"].ToString();
                                prioritaColoriList.Add(prioritaColore);
                            }

                            //dataTable.Load(reader);
                            
                        }
                    }
                    return prioritaColoriList;
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
