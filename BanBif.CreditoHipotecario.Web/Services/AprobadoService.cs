using BanBif.CreditoHipotecario.Web.Models;
using BanBif.CreditoHipotecario.Web.Services.Interfaces;
using System.Net.Http;

namespace BanBif.CreditoHipotecario.Web.Services
{
    public class AprobadoService : IAprobadoService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public AprobadoService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }
        public async Task<AprobadoResponse> ObtenerAsync(AprobadoRequest request)
        {
            
            var apiUrl = $"{_configuration["UrlAPI"]}/api/Credito/obtener-aprobado";



            try
            {
                var response = await _httpClient.PostAsJsonAsync(apiUrl, request);

                // ❌ Error HTTP (404, 500, etc.)
                if (!response.IsSuccessStatusCode)
                {
                    return new AprobadoResponse
                    {
                        result = false,
                        Message = "Error de comunicación con el servicio."
                    };
                }

                var backendResponse =
                    await response.Content.ReadFromJsonAsync<AprobadoResponse>();

                // ❌ Backend respondió pero con error de negocio
                if (backendResponse == null || !backendResponse.result)
                {
                    return new AprobadoResponse
                    {
                        result = false,
                        Message = "Los datos ingresados no son válidos."
                    };
                }

                // ✅ Todo OK
                return backendResponse;
            }
            catch (TaskCanceledException ex)
            {
                return new AprobadoResponse
                {
                    result = false,
                    Message = "Tiempo de espera agotado."
                };
            }
            catch (Exception ex)
            {
                return new AprobadoResponse
                {
                    result = false,
                    Message = "Error inesperado en el servicio."
                };
            }
        }
    }
}
