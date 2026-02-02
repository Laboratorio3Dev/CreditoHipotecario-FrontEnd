namespace BanBif.CreditoHipotecario.Web.Models
{
    public class LoginRequest
    {
        public string Documento { get; set; }
        public string Celular { get; set; }
        public string Correo { get; set; }
        public int TipoIngreso { get; set; }
        public string Estadocivil { get; set; }
        public string CodigoLog { get; set; }

    }
}
