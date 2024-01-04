using AutoMapper;
using LaSonda.Application.Contracts.IRepositories;
using LaSonda.Application.Exceptions;
using LaSonda.Domain.Models.DataProcess;
using MediatR;

namespace LaSonda.Application.Features.DataProcess.Queries.GetDataProcessList
{
    public class GetDataProcessHandler : IRequestHandler<GetDataProcessList, List<v_REP_MonitoringProcedureVm>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetDataProcessHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<v_REP_MonitoringProcedureVm>> Handle(GetDataProcessList request, CancellationToken cancellationToken)
        {
            var dataProcessList = await _unitOfWork.Repository<v_REP_MonitoringProcedure>().GetAllAsync();
            if (dataProcessList == null)
            {
                throw new NotFoundExceptionGetList("v_REP_MonitoringProcedure");
            }
            return _mapper.Map<List<v_REP_MonitoringProcedureVm>>(dataProcessList);
        }
    }
}
