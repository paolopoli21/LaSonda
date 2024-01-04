using LaSonda.Application.Contracts.IRepositories.IUser;
using LaSonda.Application.Features.User.CommonModelVm;
using LaSonda.Application.Features.User.Queries.GetToolUserById;
using LaSonda.Application.Features.User.Queries.GetToolUserByNamePassword;
using LaSonda.Application.Features.User.Queries.GetToolUserList;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace LaSonda.Api.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IToolUserRepository _toolUserRepository;

        public UserController(IToolUserRepository toolUserRepository)
        {
            _toolUserRepository = toolUserRepository;
        }

        [HttpGet("Users")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(IEnumerable<ToolUserVm>))]
        public async Task<IActionResult> GetUsersResults()
        {
            var query = new GetToolUserListQuery();
            var toolUsers = await _toolUserRepository.GetAllAsync();
            return Ok(toolUsers);
        }

        [HttpGet("find/{id}")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(ToolUserVm))]
        public async Task<IActionResult> GetUserById(int id)
        {
            //var query = new GetToolUserByIdQuery(id);
            var toolUser = await _toolUserRepository.GetAsync(x => x.ID == id);
            return Ok(toolUser);
        }

        [HttpPost("")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(IEnumerable<ToolUserVm>))]
        public async Task<IActionResult> GetUserByUserNamePassword([FromBody] ToolUserVm user)
        {
            var toolUser = await _toolUserRepository.GetAsync(x => x.UserName.Equals(user.UserName) && x.Password.Equals(user.Password));
            return Ok(toolUser);
        }
    }
}
