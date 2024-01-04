using LaSonda.Domain.Models.BackupSql;
using LaSonda.Domain.Models.DataProcess;
using LaSonda.Domain.Models.Monitoring;
using LaSonda.Domain.Models.View;
using Microsoft.EntityFrameworkCore;

namespace LaSonda.Infrastructure.Service
{
    public class LaSondaDbContext : DbContext
    {
        public LaSondaDbContext(DbContextOptions<LaSondaDbContext> options) : base(options)
        {

        }
        public virtual DbSet<MonitoringAllProcess> Monitorings { get; set; }
        public virtual DbSet<v_REP_MonitoringProcedure> RepMonitoringProcedure { get; set; }
        public virtual DbSet<v_REP_MonitoringResult> RepMonitoringResult { get; set; }
        public virtual DbSet<v_BackupList_AllServer> v_BackupList_AllServer { get; set; }
        public virtual DbSet<v_REP_Vulnerabilities> v_REP_Vulnerabilities { get; set; }
        public virtual DbSet<REP_PrioritaColori> REP_PrioritaColori { get; set; }
        public virtual DbSet<MON_LastUpdate> MON_LastUpdate { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MonitoringAllProcess>().ToSqlQuery(
                @"EXECUTE sp_MonitoringAllProcess");

            modelBuilder.Entity<v_REP_MonitoringProcedure>().ToSqlQuery(
                @"select IDCheck, Nome, Descrizione, IDStato, Stato, Colore, LastUpdate,StoredProcedure, Owner from v_REP_MonitoringProcedure
                   ORDER BY Priorita DESC, nome ASC");

            modelBuilder.Entity<v_BackupList_AllServer>().ToSqlQuery(
                @"SELECT distinct [ServerName] ServerName
                ,[Instance] Instance
                ,[DB_Name] DbName
                ,isnull([Description],'') BackupType
                ,[backup_start_date] BackupStartDate
                FROM [master].[dbo].[v_BackupList_AllServer]
                ORDER BY Instance, DbName, BackupType
                   ").HasNoKey();

            modelBuilder.Entity<v_REP_MonitoringResult>().ToSqlQuery(
                @"select IDCheck, ExecDate, IsJSON, Data from v_REP_MonitoringResult");

            modelBuilder.Entity<v_REP_Vulnerabilities>().ToSqlQuery(
                @"select ID_Wazuh, [Name], [IP], ScanDate, AffectedItems, JSONData from v_REP_Vulnerabilities").HasNoKey();

            modelBuilder.Entity<REP_PrioritaColori>()
                .HasKey(a => new { a.IDPriorita });

            modelBuilder.Entity<MON_LastUpdate>()
                .HasKey(a => new { a.LastUpdate });
        }
    }
}
