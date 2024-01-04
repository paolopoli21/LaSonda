using LaSonda.Domain.Models.DataProcess;

namespace LaSonda.Api.SignalR
{
    public interface INotificationPrioritaColori
    {
        ICollection<REP_PrioritaColori> GetPrioritaColoriNotification();
    }
}
