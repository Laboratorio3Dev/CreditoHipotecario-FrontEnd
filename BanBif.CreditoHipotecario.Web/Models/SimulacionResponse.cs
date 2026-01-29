namespace BanBif.CreditoHipotecario.Web.Models
{
    public class SimulacionResponse
    {
        public bool Result { get; set; }
        public string Message { get; set; }
        public SimulacionResult data { get; set; }
    }
}
