using AutoMapper;
using LaSonda.Application.Contracts.IRepositories;
using LaSonda.Application.Exceptions;
using LaSonda.Application.Features.User.CommonModelVm;
using LaSonda.Domain.Models.User;
using MediatR;


namespace LaSonda.Application.Features.User.Queries.GetToolUserList
{
    public class GetToolUserListQueryHandler : IRequestHandler<GetToolUserListQuery, List<ToolUserVm>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public async Task<List<ToolUserVm>> Handle(GetToolUserListQuery request, CancellationToken cancellationToken)
        {
            var toolUserList = await _unitOfWork.Repository<ToolUser>().GetAllAsync();
            if (toolUserList == null)
            {
                throw new NotFoundExceptionGetList("ToolUser");
            }
            return _mapper.Map<List<ToolUserVm>>(toolUserList);
        }
    }
}
