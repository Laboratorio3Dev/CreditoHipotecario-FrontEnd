using BanBif.CreditoHipotecario.Web.Models;
using BanBif.CreditoHipotecario.Web.Services;
using BanBif.CreditoHipotecario.Web.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BanBif.CreditoHipotecario.Web.Controllers
{
    public class AprobadoController : Controller
    {
        private readonly IAprobadoService _aprobadoService;
        private readonly IOfertaService _ofertaService;
        public AprobadoController(IAprobadoService aprobadoService, IOfertaService ofertaService)
        {
            _aprobadoService = aprobadoService;
            _ofertaService = ofertaService;
        }
        public IActionResult Index()
        {
            return View();
        }


     

        [HttpPost]
        public async Task<IActionResult> Obtener(AprobadoRequest request)
        {
            var result = await _aprobadoService.ObtenerAsync(request);
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> RegistrarOferta([FromBody] QuieroRequest request)
        {
            var result = await _ofertaService.RegistrarOfertaAsync(request);

            return Ok(result);
        }
    }
}
