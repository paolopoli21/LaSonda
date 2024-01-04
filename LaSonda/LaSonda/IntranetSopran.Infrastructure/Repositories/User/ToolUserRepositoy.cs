using IntranetSopran.Infrastructure.Repositories.Common;
using IntranetSopran.Infrastructure.Service;
using LaSonda.Application.Contracts.IRepositories.IUser;
using LaSonda.Domain.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntranetSopran.Infrastructure.Repositories.User
{
    public class ToolUserRepositoy : BaseCompleteRepository<ToolUser>, IToolUserRepository
    {
        public ToolUserRepositoy(IntranetSopranDbContext context) : base(context)
        {
        }
    }
}
