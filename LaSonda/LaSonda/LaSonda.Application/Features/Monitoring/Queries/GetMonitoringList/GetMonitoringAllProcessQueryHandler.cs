using AutoMapper;
using LaSonda.Application.Contracts.IRepositories;
using LaSonda.Application.Exceptions;
using LaSonda.Application.Features.Monitoring.Queries.CommonModelVm;
using LaSonda.Domain.Models.Monitoring;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace LaSonda.Application.Features.Monitoring.Queries.GetMonitoringList
{
    public class GetMonitoringAllProcessQueryHandler : IRequestHandler<GetMonitoringListQuery, List<MonitoringAllProcessVm>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetMonitoringAllProcessQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<MonitoringAllProcessVm>> Handle(GetMonitoringListQuery request, CancellationToken cancellationToken)
        {
            var monitoringList = await _unitOfWork.Repository<MonitoringAllProcess>().GetAllAsync();
            if (monitoringList == null)
            {
                throw new NotFoundExceptionGetList("MonitoringAllProcess");
            }
            return _mapper.Map<List<MonitoringAllProcessVm>>(monitoringList);
        }
    }
}
