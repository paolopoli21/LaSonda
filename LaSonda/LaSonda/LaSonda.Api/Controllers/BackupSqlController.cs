using LaSonda.Application.Features.BackupSql.Queries.GetvBackupListAllServer;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace LaSonda.Api.Controllers
{
    [ApiController]
    [Route("api")]

    public class BackupSqlController : Controller
    {
        private readonly IMediator _mediator;

        public BackupSqlController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("backupSql")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(IEnumerable<v_BackupList_AllServerVm>))]
        public async Task<IActionResult> GetMonitoringResults()
        {
            var query = new GetvBackupListAllServerQuery();
            var backupList = await _mediator.Send(query);
            return Ok(backupList);
        }
    }
}   