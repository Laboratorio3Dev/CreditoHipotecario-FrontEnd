using BanBif.CreditoHipotecario.Web.Models;

namespace BanBif.CreditoHipotecario.Web.Services.Interfaces
{
    public interface ILoginService
    {
        Task<LoginResponse> LoginAsync(LoginRequest request);
    }
}
