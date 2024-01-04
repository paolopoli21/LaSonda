using LaSonda.Application.Features.DataProcess.CommonModelVm;
using LaSonda.Application.Features.DataProcess.Queries.GetDataProcessList;
using LaSonda.Application.Features.DataProcess.Queries.GetMonitoringResultByIdCheck;
using LaSonda.Application.Features.DataProcess.Queries.GetMonitoringResultList;
using LaSonda.Application.Features.DataProcess.Queries.GetPrioritaColoreList;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace LaSonda.Api.Controllers
{
    [ApiController]
    [Route("api/sonda")]
    public class DataProcessController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DataProcessController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("monitoringprocess")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(IEnumerable<v_REP_MonitoringProcedureVm>))]
        public async Task<IActionResult> GetMonitoring()
        {
            var query = new GetDataProcessList();
            var dataprocessList = await _mediator.Send(query);
            return Ok(dataprocessList);
        }

        [HttpGet("monitoringresult")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(IEnumerable<v_REP_MonitoringResultVm>))]
        public async Task<IActionResult> GetMonitoringResults()
        {
            var query = new GetMonitoringResultList();
            var mointoringResults = await _mediator.Send(query);
            return Ok(mointoringResults);
        }

        [HttpGet("monitoringresult/{idCheck}")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(v_REP_MonitoringResultVm))]
        public async Task<IActionResult> GetMonitoringResultsByIdCheck(int idCheck)
        {
            var query = new GetMonitoringResultByIdCheckQuery(idCheck);
            var mointoringResult = await _mediator.Send(query);
            return Ok(mointoringResult);
        }

        [HttpGet("prioritacolori")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(IEnumerable<REP_PrioritaColoriVm>))]
        public async Task<IActionResult> GetPrioritaColoreList()
        {
            var query = new GetPrioritaColoreListQuery();
            var prioritaColoreList = await _mediator.Send(query);
            return Ok(prioritaColoreList);
        }
    }
}
