using BanBif.CreditoHipotecario.Web.Models;
using BanBif.CreditoHipotecario.Web.Services.Interfaces;

namespace BanBif.CreditoHipotecario.Web.Services
{
    public class OfertaService : IOfertaService
    {
        private readonly HttpClient _http;
        private readonly IConfiguration _configuration;
        public OfertaService(HttpClient http, IConfiguration configuration)
        {
            _http = http;
            _configuration = configuration;
        }

        public async Task<QuieroResponse> RegistrarOfertaAsync(QuieroRequest request)
        {
            var apiUrl = $"{_configuration["UrlAPI"]}/api/Credito/registrar-oferta";
            var response = await _http.PostAsJsonAsync(
                apiUrl,
                request);

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<QuieroResponse>();
        }
    }
}
