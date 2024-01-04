using AutoMapper;
using LaSonda.Application.Contracts.IRepositories;
using LaSonda.Application.Exceptions;
using LaSonda.Domain.Models.BackupSql;
using MediatR;

namespace LaSonda.Application.Features.BackupSql.Queries.GetvBackupListAllServer
{
    public class GetvBackupListAllServerQueryHandler : IRequestHandler<GetvBackupListAllServerQuery, List<v_BackupList_AllServerVm>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetvBackupListAllServerQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<v_BackupList_AllServerVm>> Handle(GetvBackupListAllServerQuery request, CancellationToken cancellationToken)
        {
            //var bakcupList = await _unitOfWork.Repository<v_BackupList_AllServer>().GetAllAsync();
            var bakcupList = await _unitOfWork.Iv_BackupList_AllServerRepository.GetAllBackups();
            if (bakcupList == null) {
                throw new NotFoundExceptionGetList("v_BackupList_AllServer");
            }
            return _mapper.Map<List<v_BackupList_AllServerVm>>(bakcupList);
        }
    }
}
