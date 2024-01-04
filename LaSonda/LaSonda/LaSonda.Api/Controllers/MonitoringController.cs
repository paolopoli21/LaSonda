using LaSonda.Application.Features.Monitoring.Queries.CommonModelVm;
using LaSonda.Application.Features.Monitoring.Queries.GetMonitoringList;
using LaSonda.Application.Features.Monitoring.Queries.GetMonitoringOrderByLastRun;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace LaSonda.Api.Controllers
{
    [ApiController]
    [Route("api")]
    public class MonitoringController : ControllerBase
    {
        private readonly IMediator _mediator;

        public MonitoringController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("monitoringTest")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(IEnumerable<MonitoringAllProcessVm>))]
        public async Task<IActionResult> GetMonitoringResults()
        {
            var query = new GetMonitoringListQuery();
            var monitorings = await _mediator.Send(query);
            return Ok(monitorings);
        }

        [HttpGet("monitoring")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(IEnumerable<MonitoringAllProcessVm>))]
        public async Task<IActionResult> GetMonitoringOrderByLastRunResults()
        {
            var query = new GetMonitoringOrderByLastRunQuery();
            var monitorings = await _mediator.Send(query);
            return Ok(monitorings);
        }
    }
}
