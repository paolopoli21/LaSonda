using IntranetSopran.Infrastructure;
using LaSonda.Api.Hubs;
using LaSonda.Api.Middleware;
using LaSonda.Api.SubscribeTableDependencies;
using LaSonda.Application;
using LaSonda.Infrastructure;


var builder = WebApplication.CreateBuilder(args);

string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddSopranIntranetInfrastructureServices(builder.Configuration);



//builder.Services.AddScoped<INotificationPrioritaColori, PrioritaColoriNotification>();

builder.Services.AddSingleton<DashboardHub>();
builder.Services.AddSingleton<SubscribePrioritaColoreTableDependency>();
builder.Services.AddSingleton<SubscribeMonLastUpdateTableDependency>();
//builder.Services.AddApplicationServices();

builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                        builder =>
                        {
                            builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                        });
});


var app = builder.Build();

var connectionString = app.Configuration.GetConnectionString("ConnectionStringLaSonda");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();


//app.MapHub<DashboardHub>("/prioritacolorihub");
app.MapHub<DashboardHub>("/getmonitoringhub");

app.MapControllerRoute(
                  name: "default",
                  pattern: "{controller=Home}/{action=Index}/{id?}");

//app.UseSqlTableDependency<SubscribePrioritaColoreTableDependency>(connectionString);
app.UseSqlTableDependency<SubscribeMonLastUpdateTableDependency>(connectionString);

app.Run();




