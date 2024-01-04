using LaSonda.Application.Features.User.CommonModelVm;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LaSonda.Application.Features.User.Queries.GetToolUserByNamePassword
{
    public class GetToolUserByUserNamePasswordQuery : IRequest<ToolUserVm>
    {
        public string Username { get; set; }
        public string Password  { get; set; }

        public GetToolUserByUserNamePasswordQuery(string userName, string password)
        {
            Username = userName;
            Password = password;
        }
    }
}
