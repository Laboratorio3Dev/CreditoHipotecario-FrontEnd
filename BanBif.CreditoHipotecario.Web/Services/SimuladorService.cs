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
            var apiUrl = $"{_configuration["UrlAPI"]}/api/Credito/simular";



            try
            {
                var response = await _httpClient.PostAsJsonAsync(apiUrl, request);

                // ❌ Error HTTP (404, 500, etc.)
                if (!response.IsSuccessStatusCode)
                {
                    return new SimulacionResponse
                    {
                        Result = false,
                        Message = "Error de comunicación con el servicio."
                    };
                }

                var backendResponse =
                    await response.Content.ReadFromJsonAsync<SimulacionResponse>();

                // ❌ Backend respondió pero con error de negocio
                if (backendResponse == null || !backendResponse.Result)
                {
                    return new SimulacionResponse
                    {
                        Result = false,
                        Message = "Los datos ingresados no son válidos."
                    };
                }

                // ✅ Todo OK
                return backendResponse;
            }
            catch (TaskCanceledException ex)
            {
                return new SimulacionResponse
                {
                    Result = false,
                    Message = "Tiempo de espera agotado."
                };
            }
            catch (Exception ex)
            {
                return new SimulacionResponse
                {
                    Result = false,
                    Message = "Error inesperado en el servicio."
                };
            }
        
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
