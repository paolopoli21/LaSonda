using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

using IntranetSopran.Infrastructure.Service;
using LaSonda.Application.Contracts.IRepositories;
using IntranetSopran.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using LaSonda.Application.Contracts.IRepositories.IUser;
using IntranetSopran.Infrastructure.Repositories.User;

namespace IntranetSopran.Infrastructure
{
    public static class IntranetSopranServiceRegistration
    {
        public static IServiceCollection AddSopranIntranetInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<IntranetSopranDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("ConnectionStringIntranetSopran")));
            services.AddScoped<IToolUserRepository, ToolUserRepositoy>();
            return services;
        }
    }
}
