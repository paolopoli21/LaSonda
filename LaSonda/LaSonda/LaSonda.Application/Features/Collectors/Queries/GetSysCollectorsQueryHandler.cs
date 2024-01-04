using AutoMapper;
using LaSonda.Application.Contracts.IRepositories;
using LaSonda.Application.Exceptions;
using LaSonda.Domain.Models.View;
using MediatR;

namespace LaSonda.Application.Features.Collectors.Queries
{
    public class GetSysCollectorsQueryHandler : IRequestHandler<GetSysCollectorsQuery, List<REP_SyscollectorsVm>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetSysCollectorsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<REP_SyscollectorsVm>> Handle(GetSysCollectorsQuery request, CancellationToken cancellationToken)
        {
            //throw new NotImplementedException();
            var collectors = await _unitOfWork.Repository<REP_Syscollectors>().GetAllAsync();

            if (collectors == null) {
                throw new NotFoundExceptionGetList("REP_Syscollectors");
            }

            return _mapper.Map<List<REP_SyscollectorsVm>>(collectors);
        }
    }
}
