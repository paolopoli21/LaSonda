using LaSonda.Application.Features.DataProcess.Queries.GetPrioritaColoreList;
using LaSonda.Domain.Models.DataProcess;
using LaSonda.Infrastructure.Service;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using TableDependency.SqlClient;
using TableDependency.SqlClient.Base.EventArgs;

namespace LaSonda.Api.SignalR
{
    public class PrioritaColoriNotification : INotificationPrioritaColori
    {
        private readonly IMediator _mediator;

        private readonly LaSondaDbContext _laSondaContext;

        private readonly IHubContext<PrioritaColoriHub> _hub;
        string connectionString = "";

        public PrioritaColoriNotification(IMediator mediator, LaSondaDbContext laSondaContext, IHubContext<PrioritaColoriHub> hub)
        {
            _mediator = mediator;
            _laSondaContext = laSondaContext;
            _hub = hub;
            connectionString = _laSondaContext.Database.GetDbConnection().ConnectionString;
        }

        public ICollection<REP_PrioritaColori> GetPrioritaColoriNotification()
        {
            var prioritaColori = new List<REP_PrioritaColori>();

            var dep = new SqlTableDependency<REP_PrioritaColori>(connectionString, "REP_PrioritaColori");

            dep.OnChanged += ChangedAsync;
            dep.Start();
            //Console.WriteLine("Press a key to exit");
            //Console.ReadKey();
            //dep.Stop();
            return prioritaColori;
        }

        private  void ChangedAsync(object sender, RecordChangedEventArgs<REP_PrioritaColori> e)
        {
            //var changedEntity = e.Entity;
            //var usersHub =  this._sopranDbContex
            //    .User.AsNoTracking().ToList();

            //var prioritaColori = new List<REP_PrioritaColori>();
            ////var usersHub = userHubObject.GetUsersHubByAsync();
            //using (SqlConnection conn = new SqlConnection(connectionString))
            //{
            //    using (var cmd = conn.CreateCommand())
            //    {
            //        cmd.CommandType = CommandType.Text;
            //        cmd.CommandText = @"SELECT [IDPriorita], [Descrizione], [colore] FROM [dbo].[REP_PrioritaColori]";
            //        conn.Open();
            //        var reader = cmd.ExecuteReader();
            //        while (reader.Read())
            //        {
            //            var prioritaColore = new REP_PrioritaColori();
            //            prioritaColore.IDPriorita = Convert.ToInt32(reader["IDPriorita"]);
            //            prioritaColore.Descrizione = reader["Descrizione"].ToString();
            //            prioritaColore.Colore = reader["colore"].ToString();
            //            prioritaColori.Add(prioritaColore);
            //        }
            //    }
            //}
            //return users;
            var query = new GetPrioritaColoreListQuery();
            var prioritaColori =  _mediator.Send(query);

            _hub.Clients.All.SendAsync("getprioritacolorihub", prioritaColori);
        }
    }
}
