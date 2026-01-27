namespace BanBif.CreditoHipotecario.Web.Models
{
    public class LoginResult
    {
        public int codigocliente { get; set; }
        public string? cliente { get; set; }
        public string? flujo { get; set; }
        public decimal? montoaprobado { get; set; }
        public decimal? montoaprobadodolares { get; set; }
        public bool? flagcliente { get; set; }
    }
}
