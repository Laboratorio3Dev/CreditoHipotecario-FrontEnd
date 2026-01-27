using BanBif.CreditoHipotecario.Web.Models;
using BanBif.CreditoHipotecario.Web.Services.Interfaces;
using Humanizer;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using static System.Net.WebRequestMethods;

namespace BanBif.CreditoHipotecario.Web.Services
{
    public class LoginService : ILoginService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public LoginService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }
        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            var apiUrl = $"{_configuration["UrlAPI"]}/api/credito/credito/login";

            try
            {
                var response = await _httpClient.PostAsJsonAsync(apiUrl, request);

                // ❌ Error HTTP (404, 500, etc.)
                if (!response.IsSuccessStatusCode)
                {
                    return new LoginResponse
                    {
                        Result = false,
                        Message = "Error de comunicación con el servicio."
                    };
                }

                var backendResponse =
                    await response.Content.ReadFromJsonAsync<LoginResponse>();

                // ❌ Backend respondió pero con error de negocio
                if (backendResponse == null || !backendResponse.Result)
                {
                    return new LoginResponse
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
                return new LoginResponse
                {
                    Result = false,
                    Message = "Tiempo de espera agotado."
                };
            }
            catch (Exception ex)
            {
                return new LoginResponse
                {
                    Result = false,
                    Message = "Error inesperado en el servicio."
                };
            }
        }


    }
}
