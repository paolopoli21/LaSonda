using AutoMapper;
using LaSonda.Application.Features.DataProcess.CommonModelVm;
using LaSonda.Application.Features.DataProcess.Queries.GetMonitoringResultByIdCheck;
using LaSonda.Application.Features.Monitoring.Queries.CommonModelVm;
using LaSonda.Application.Features.Monitoring.Queries.GetMonitoringList;
using LaSonda.Application.Mappings;
using LaSonda.Application.UnitTests.Mock;
using LaSonda.Infrastructure.Repositories;
using Moq;
using Shouldly;
using Xunit;

namespace LaSonda.Application.UnitTests.Features.DataProcess.Queries
{
    public class GetMonitoringResultByIdCheckQueryHandlerXUnitTests
    {
        private readonly IMapper _mapper;
        private readonly Mock<UnitOfWork> _unitOfWork;

        public GetMonitoringResultByIdCheckQueryHandlerXUnitTests()
        {
            _unitOfWork = MockUnitOfWork.GetUnitOfWork();
            var mapperConfig = new MapperConfiguration(c =>
            {
                c.AddProfile<MappingProfile>();
            });
            _mapper = mapperConfig.CreateMapper();
        }
        [Fact]
        public async Task GetMonitoringResultByIdCheckQueryHandler()
        {
            var handler = new GetMonitoringResultByIdCheckQueryHandler(_unitOfWork.Object, _mapper);
            var request = new GetMonitoringResultByIdCheckQuery(56);
            var result = await handler.Handle(request, CancellationToken.None);

            result.ShouldBeOfType<List<v_REP_MonitoringResultVm>>();
        }
    }
}
