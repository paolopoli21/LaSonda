using AutoFixture;
using LaSonda.Application.Contracts.IRepositories.IRepositoryMonitoring;
using LaSonda.Application.Features.Monitoring.Queries.GetMonitoringOrderByLastRun;
using LaSonda.Domain.Models.Monitoring;
using LaSonda.Infrastructure.Repositories.Monitoring;
using LaSonda.Infrastructure.Service;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace LaSonda.Application.UnitTests.Mock
{
    public static class MockMonitoringAllProcessRepository
    {
        public static Mock<IMonitoringAllProcessRepository> GetVideoRepository() {
            var fixtures = new Fixture();
            fixtures.Behaviors.Add(new OmitOnRecursionBehavior());
            var Monitorigs = fixtures.CreateMany<MonitoringAllProcess>().ToList();

            var mockRepository = new Mock<IMonitoringAllProcessRepository>();

            mockRepository.Setup(r => r.GetAllAsync()).ReturnsAsync(Monitorigs);

            return mockRepository;  
        }

        //public static Mock<MonitoringAllProcessRepository> GetMonitoringAllProcessRepository()
        //{
        //    var fixtures = new Fixture();
        //    fixtures.Behaviors.Add(new OmitOnRecursionBehavior());
        //    var Monitorigs = fixtures.CreateMany<MonitoringAllProcess>().ToList();
        //    Monitorigs.Add(fixtures.Build<MonitoringAllProcess>()
        //            .With(tr => tr.processname, "Test")
        //            .Create()
        //        );

        //    var options = new DbContextOptionsBuilder<LaSondaDbContext>()
        //        .UseInMemoryDatabase(databaseName: $"LaSondaDbContext-{Guid.NewGuid}")
        //        .Options;

        //    var LaSondaDbContextFake = new LaSondaDbContext(options);
        //    LaSondaDbContextFake.Monitorings.AddRange(Monitorigs);

        //    LaSondaDbContextFake.SaveChanges();

        //    var mockRepository = new Mock<MonitoringAllProcessRepository>();

        //    mockRepository.Setup(r => r.GetAllAsync()).ReturnsAsync(Monitorigs);

        //    return mockRepository;
        //}

        public static void AddDataMonitoringAllProcessRepository(LaSondaDbContext LaSondaDbContextFake) 
        { 
            var fixture = new Fixture();
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());

            var monitorings = fixture.CreateMany<MonitoringAllProcess>().ToList();

            monitorings.Add(fixture.Build<MonitoringAllProcess>()
                    .With(tr => tr.processname, "Test")
                    .Create()
                );
            LaSondaDbContextFake.Monitorings.AddRange(monitorings);
            LaSondaDbContextFake.SaveChanges();
        }
    }
}
