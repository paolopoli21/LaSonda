using AutoMapper;
using LaSonda.Application.Contracts.IRepositories;
using LaSonda.Application.Exceptions;
using LaSonda.Domain.Models.DataProcess;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LaSonda.Application.Features.DataProcess.Queries.GetPrioritaColoreList
{
    public class GetPrioritaColoreListQuery : IRequest<List<REP_PrioritaColoriVm>>
    {
        
    }
}
