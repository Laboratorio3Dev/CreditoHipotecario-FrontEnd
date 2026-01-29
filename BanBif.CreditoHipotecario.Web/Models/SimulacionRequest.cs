namespace BanBif.CreditoHipotecario.Web.Models
{
    public class SimulacionRequest
    {
        public int CodigoCliente { get; set; }
        public int Moneda { get; set; }
        public int ValorInmueble { get; set; }
        public int DineroNecesita { get; set; }
        public int IngresoMensual { get; set; }
        public int TipoIngreso { get; set; }
        public bool CompartirCuota { get; set; }
        public bool InmuebleComprar { get; set; }
        public bool FlagTerminos { get; set; }
        public bool FlagDatos { get; set; }
        public int PrimeraVivienda { get; set; }
        public int? MontoInicial { get; set; }
    }
}
