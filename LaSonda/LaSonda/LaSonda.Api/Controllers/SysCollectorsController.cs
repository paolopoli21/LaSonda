using LaSonda.Application.Features.Collectors.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace LaSonda.Api.Controllers
{
    [ApiController]
    [Route("api")]
    public class SysCollectorsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public SysCollectorsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("collectors")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(IEnumerable<REP_SyscollectorsVm>))]
        public async Task<IActionResult> GetSysCollectors() {
            var query = new GetSysCollectorsQuery();
            var collectors = await _mediator.Send(query);
            return Ok(collectors);
        }
    }
}
