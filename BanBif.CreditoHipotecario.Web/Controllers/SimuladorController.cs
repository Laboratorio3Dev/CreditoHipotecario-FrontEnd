using BanBif.CreditoHipotecario.Web.Models;
using BanBif.CreditoHipotecario.Web.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BanBif.CreditoHipotecario.Web.Controllers
{
    public class SimuladorController : Controller
    {
        private readonly ISimuladorService _simuladorService;

        public SimuladorController(ISimuladorService simuladorService)
        {
            _simuladorService = simuladorService;
        }

        // GET: /Simulador
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Simular( SimulacionRequest request)
        {
            var result = await _simuladorService.SimularAsync(request);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Configuracion()
        {
            var result = await _simuladorService.ObtenerConfiguracionAsync();
            return Ok(result);
        }
    }
}
