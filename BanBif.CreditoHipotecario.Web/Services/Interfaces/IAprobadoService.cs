using BanBif.CreditoHipotecario.Web.Models;

namespace BanBif.CreditoHipotecario.Web.Services.Interfaces
{
    public interface IAprobadoService
    {
        Task<AprobadoResponse> ObtenerAsync(AprobadoRequest request);
    }
}
