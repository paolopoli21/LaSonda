using AutoMapper;
using LaSonda.Application.Contracts.IRepositories;
using LaSonda.Application.Exceptions;
using LaSonda.Application.Features.User.CommonModelVm;
using LaSonda.Application.Features.User.Queries.GetToolUserByNamePassword;
using LaSonda.Domain.Models.User;
using MediatR;


namespace LaSonda.Application.Features.User.Queries.GetToolUserByUserNamePassword
{
    public class GetToolUserByUserNamePasswordQueryHandler : IRequestHandler<GetToolUserByUserNamePasswordQuery, ToolUserVm>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetToolUserByUserNamePasswordQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ToolUserVm> Handle(GetToolUserByUserNamePasswordQuery request, CancellationToken cancellationToken)
        {

            var toolUser = await _unitOfWork.Repository<ToolUser>().GetAsync(x => x.Equals(request.Username) && x.Equals(request.Password));
            if (toolUser == null)
            {
                throw new NotFoundExceptionGetList("ToolUser");
            }
            return _mapper.Map<ToolUserVm>(toolUser);
        }
    }
}
