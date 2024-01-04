using AutoMapper;
using LaSonda.Application.Contracts.IRepositories;
using LaSonda.Application.Exceptions;
using LaSonda.Domain.Models.DataProcess;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LaSonda.Application.Features.DataProcess.Queries.GetPrioritaColoreList
{
    public class GetPrioritaColoreListQueryHandler : IRequestHandler<GetPrioritaColoreListQuery, List<REP_PrioritaColoriVm>>
    {
        private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public GetPrioritaColoreListQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<List<REP_PrioritaColoriVm>> Handle(GetPrioritaColoreListQuery request, CancellationToken cancellationToken)
    {
        var dataProcessList = await _unitOfWork.Repository<REP_PrioritaColori>().GetAllAsync();
        if (dataProcessList == null)
        {
            throw new NotFoundExceptionGetList("REP_PrioritaColori");
        }
        return _mapper.Map<List<REP_PrioritaColoriVm>>(dataProcessList);
    }
}
}
