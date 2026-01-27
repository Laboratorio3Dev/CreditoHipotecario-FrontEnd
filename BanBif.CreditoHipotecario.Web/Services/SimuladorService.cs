using BanBif.CreditoHipotecario.Web.Models;
using BanBif.CreditoHipotecario.Web.Services.Interfaces;

namespace BanBif.CreditoHipotecario.Web.Services
{
    public class SimuladorService : ISimuladorService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public SimuladorService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<SimulacionResponse> SimularAsync(SimulacionRequest request)
        {
            var apiUrl = $"{_configuration["UrlAPI"]}/api/Credito/Simular";

            var response = await _httpClient.PostAsJsonAsync(apiUrl, request);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<SimulacionResponse>();
        }

        public async Task<ConfiguracionResponse> ObtenerConfiguracionAsync()
        {
            var apiUrl = $"{_configuration["UrlAPI"]}/api/Credito/ObtenerConfiguracion";

            var response = await _httpClient.PostAsync(apiUrl, null);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<ConfiguracionResponse>();
        }
    }
}
