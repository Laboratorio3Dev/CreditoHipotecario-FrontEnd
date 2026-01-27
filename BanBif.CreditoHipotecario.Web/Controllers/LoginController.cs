using BanBif.CreditoHipotecario.Web.Models;
using BanBif.CreditoHipotecario.Web.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BanBif.CreditoHipotecario.Web.Controllers
{
    public class LoginController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly ILoginService _loginService;
        public LoginController(IConfiguration configuration, ILoginService loginService)
        {
            _configuration = configuration;
            _loginService = loginService;

        }
        public IActionResult Index(string tp, string utm_medium)
        {
            var tipo = 0;

            if (tp == null)
                ViewBag.tipoIngreso = tipo;
            else
            {
                var resultado = int.TryParse(tp, out tipo);
                if (resultado)
                {
                    ViewBag.tipoIngreso = tp;
                }
                else
                {
                    ViewBag.tipoIngreso = tipo;
                }
            }
            var utm = "";
            if (utm_medium == null)
            {
                utm = "ORGANICO";
            }
            else
            {
                utm = utm_medium;
            }
            ViewBag.UTM = utm;

            ViewBag.App = _configuration["UrlAPP"];
            return View();
        }


        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _loginService.LoginAsync(request);
            return Ok(result);
        }
    }
}
