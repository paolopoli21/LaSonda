using AutoFixture;
using LaSonda.Application.Contracts.IRepositories.IRepositoryDataProcess;
using LaSonda.Domain.Models.DataProcess;
using LaSonda.Domain.Models.Monitoring;
using LaSonda.Infrastructure.Service;
using Moq;

namespace LaSonda.Application.UnitTests.Mocks
{
    public static class MockV_REP_MonitoringResultRepository
    {
        public static Mock<Iv_REP_MonitoringResultRepository>  Getv_REP_MonitoringResultRepository() 
        {
            var fixure = new Fixture();
            fixure.Behaviors.Add(new OmitOnRecursionBehavior());
            var monitoringsResult = fixure.CreateMany<v_REP_MonitoringResult>().ToList();
            var mockRepository = new Mock<Iv_REP_MonitoringResultRepository>();

            mockRepository.Setup(r => r.GetAllAsync()).ReturnsAsync(monitoringsResult);
            return mockRepository;
        }

        public static void AddV_REP_MonitoringResultRepository(LaSondaDbContext LaSondaDbContextFake)
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
