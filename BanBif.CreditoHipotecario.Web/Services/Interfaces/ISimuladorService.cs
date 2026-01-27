using BanBif.CreditoHipotecario.Web.Models;

namespace BanBif.CreditoHipotecario.Web.Services.Interfaces
{
    public interface ISimuladorService
    {
        Task<SimulacionResponse> SimularAsync(SimulacionRequest request);
        Task<ConfiguracionResponse> ObtenerConfiguracionAsync();
    }
}
