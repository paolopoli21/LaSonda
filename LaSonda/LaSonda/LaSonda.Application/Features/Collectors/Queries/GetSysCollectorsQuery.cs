using MediatR;

namespace LaSonda.Application.Features.Collectors.Queries
{
    public class GetSysCollectorsQuery: IRequest<List<REP_SyscollectorsVm>>
    {
    }
}
