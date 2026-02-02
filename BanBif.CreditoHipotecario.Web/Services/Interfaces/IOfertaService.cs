using BanBif.CreditoHipotecario.Web.Models;

namespace BanBif.CreditoHipotecario.Web.Services.Interfaces
{
    public interface IOfertaService
    {
        Task<QuieroResponse> RegistrarOfertaAsync(QuieroRequest request);
    }
}
