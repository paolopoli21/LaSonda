using AutoMapper;
using LaSonda.Application.Contracts.IRepositories;
using LaSonda.Application.Exceptions;
using MediatR;

namespace LaSonda.Application.Features.Vulnerabilities.Queries.GetRepVulnerabilities
{
    public class GetVRepVulnerabilitiesQueryHandler : IRequestHandler<GetVRepVulnerabilitiesQuery, List<v_REP_VulnerabilitiesVm>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetVRepVulnerabilitiesQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<v_REP_VulnerabilitiesVm>> Handle(GetVRepVulnerabilitiesQuery request, CancellationToken cancellationToken)
        {
            var vulnabilities = await _unitOfWork.Iv_REP_VulnerabilitiesRepository.GetAllVulnerabilities();
            if (vulnabilities == null)
            {
                throw new NotFoundExceptionGetList("v_REP_Vulnerabilities");
            }
            return _mapper.Map<List<v_REP_VulnerabilitiesVm>>(vulnabilities);
        }
    }
}
