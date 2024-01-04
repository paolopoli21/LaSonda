using LaSonda.Application.Features.DataProcess.Queries.GetPrioritaColoreList;
using LaSonda.Domain.Models.DataProcess;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace LaSonda.Api.SignalR
{
    public class PrioritaColoriHub : Hub
    {
        private readonly IMediator _mediator;

        public PrioritaColoriHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public override async Task OnConnectedAsync()
        {
            var query = new GetPrioritaColoreListQuery();
            var prioritaColori = await _mediator.Send(query);
            await Clients.Caller.SendAsync("UpdateListUser", prioritaColori);
        }
    }
}
