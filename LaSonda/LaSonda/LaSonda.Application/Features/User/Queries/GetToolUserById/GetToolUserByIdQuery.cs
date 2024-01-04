using LaSonda.Application.Features.User.CommonModelVm;
using MediatR;

namespace LaSonda.Application.Features.User.Queries.GetToolUserById
{

    public class GetToolUserByIdQuery : IRequest<ToolUserVm>
    {
        public int _id { get; set; }

        public GetToolUserByIdQuery(int id)
        {
            _id = id;
        }
    }
}
