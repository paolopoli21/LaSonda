using LaSonda.Application.Contracts.IRepositories;
using LaSonda.Infrastructure.Repositories;
using LaSonda.Infrastructure.Service;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LaSonda.Infrastructure
{
    public static class InfrastructureServiceRegistration
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<LaSondaDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("ConnectionStringLaSonda")));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            //services.AddScoped(typeof(IBaseSimpleRepository<>), typeof(BaseSimpleRepository<>));
            //services.AddScoped<IMonitoringAllProcessRepository, MonitoringAllProcessRepository>();
            return services;
        }
    }
}
