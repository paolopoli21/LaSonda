using LaSonda.Application.Features.User.CommonModelVm;
using MediatR;


namespace LaSonda.Application.Features.User.Queries.GetToolUserList
{
    public class GetToolUserListQuery : IRequest<List<ToolUserVm>>
    {
    }
}
