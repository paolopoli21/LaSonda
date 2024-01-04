using AutoMapper;
using LaSonda.Application.Contracts.IRepositories;
using LaSonda.Application.Exceptions;
using LaSonda.Application.Features.User.CommonModelVm;
using LaSonda.Domain.Models.User;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace LaSonda.Application.Features.User.Queries.GetToolUserById
{
    public class GetToolUserByIdQueryHandler : IRequestHandler<GetToolUserByIdQuery, ToolUserVm>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetToolUserByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ToolUserVm> Handle(GetToolUserByIdQuery request, CancellationToken cancellationToken)
        {
    
            var toolUser = await _unitOfWork.Repository<ToolUser>().GetAsync(x => EF.Equals(x.ID, $"{request._id}"));
            if (toolUser == null)
            {
                throw new NotFoundExceptionGetList("ToolUser");
            }
            return _mapper.Map<ToolUserVm>(toolUser);
        }

    }
}
