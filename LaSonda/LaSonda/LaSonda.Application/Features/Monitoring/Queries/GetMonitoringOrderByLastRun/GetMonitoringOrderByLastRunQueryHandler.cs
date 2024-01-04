using AutoMapper;
using LaSonda.Application.Contracts.IRepositories;
using LaSonda.Application.Exceptions;
using LaSonda.Application.Features.Monitoring.Queries.CommonModelVm;
using MediatR;

namespace LaSonda.Application.Features.Monitoring.Queries.GetMonitoringOrderByLastRun
{
    public class GetMonitoringOrderByLastRunQueryHandler : IRequestHandler<GetMonitoringOrderByLastRunQuery, List<MonitoringAllProcessVm>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetMonitoringOrderByLastRunQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<MonitoringAllProcessVm>> Handle(GetMonitoringOrderByLastRunQuery request, CancellationToken cancellationToken)
        {
            var monitorings = await _unitOfWork.MonitoringAllProcessRepository.GetMonitoringsOrderByLastRun();
            //if (monitorings == null)
            //{
            //    throw new NotFoundExceptionGetList("MonitoringAllProcess");
            //}
            return _mapper.Map<List<MonitoringAllProcessVm>>(monitorings);
        }
    }
}
