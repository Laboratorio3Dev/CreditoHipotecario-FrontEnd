namespace BanBif.CreditoHipotecario.Web.Models
{
    public class QuieroRequest
    {
        public int codigoquiero { get; set; }
        public int codigocliente { get; set; }
        public int codigoaprobado { get; set; }
        public int horario { get; set; }
        public string ruta { get; set; }
        public string UTM { get; set; }
        public List<int> codigosaprobados { get; set; }
        public string CodigoLog { get; set; }
    }
}
