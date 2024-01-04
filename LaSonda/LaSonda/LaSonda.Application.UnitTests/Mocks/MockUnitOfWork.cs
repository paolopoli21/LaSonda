using LaSonda.Application.Contracts.IRepositories;
using LaSonda.Infrastructure.Repositories;
using LaSonda.Infrastructure.Service;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace LaSonda.Application.UnitTests.Mock
{
    public static class MockUnitOfWork
    {
        public static Mock<UnitOfWork> GetUnitOfWork() { 
            Guid dbContextId = Guid.NewGuid();

            var options = new DbContextOptionsBuilder<LaSondaDbContext>()
                .UseInMemoryDatabase(databaseName: $"LaSondaDbContext-{dbContextId}")
                .Options;

            var laSondaDbContextFake = new LaSondaDbContext(options);
            laSondaDbContextFake.Database.EnsureDeleted();
            var mockUnitOfWork = new Mock<UnitOfWork>(laSondaDbContextFake);

            return mockUnitOfWork;

        }
    }
}
