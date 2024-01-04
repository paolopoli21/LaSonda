using AutoMapper;
using LaSonda.Application.Contracts.IRepositories;
using LaSonda.Application.Features.Monitoring.Queries.CommonModelVm;
using LaSonda.Application.Features.Monitoring.Queries.GetMonitoringList;
using LaSonda.Application.Mappings;
using LaSonda.Application.UnitTests.Mock;
using LaSonda.Infrastructure.Repositories;
using Moq;
using Shouldly;
using System.Collections.Generic;
using Xunit;

namespace LaSonda.Application.UnitTests.Features.Monitoring.Queries
{
    public class GetMonitoringAllProcessQueryHandlerXUnitTests
    {
        private readonly IMapper _mapper;
        private readonly Mock<UnitOfWork> _unitOfWork;

        public GetMonitoringAllProcessQueryHandlerXUnitTests()
        {
            _unitOfWork = MockUnitOfWork.GetUnitOfWork();
            var mapperConfig = new MapperConfiguration(c =>
            {
                c.AddProfile<MappingProfile>(); 
            });
            _mapper = mapperConfig.CreateMapper();
        }
        [Fact]
        public async Task GetMonitoringAllProcessListTest() {
            var handler = new GetMonitoringAllProcessQueryHandler(_unitOfWork.Object, _mapper);
            var request = new GetMonitoringListQuery();
            var result = await handler.Handle(request, CancellationToken.None);

            result.ShouldBeOfType<List<MonitoringAllProcessVm>>();
        }
    }
}
