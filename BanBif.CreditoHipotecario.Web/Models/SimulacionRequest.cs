namespace BanBif.CreditoHipotecario.Web.Models
{
    public class SimulacionRequest
    {
        public int codigocliente { get; set; }
        public int moneda { get; set; }
        public int valorinmueble { get; set; }
        public int dineronecesita { get; set; }
        public int ingresomensual { get; set; }
        public int tipoingreso { get; set; }
        public bool compartircuota { get; set; }
        public bool inmueblecomprar { get; set; }
        public bool flagterminos { get; set; }
        public bool flagdatos { get; set; }
    }
}
