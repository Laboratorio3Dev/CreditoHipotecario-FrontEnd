namespace BanBif.CreditoHipotecario.Web.Models
{
    public class AprobadoResponse
    {
        public bool result { get; set; }
        public string Message { get; set; }
        public AprobadoResult data { get; set; }
    }
}
