document.addEventListener('DOMContentLoaded', () => {
    obtenerDatos();
});


/* =========================
   HELPERS
========================= */
function money(v) {
    return Number(v).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


/* =========================
   OBTENER DATOS
========================= */
async function obtenerDatos() {
    const formData = new FormData();
    const payload = {
        codigocliente: sessionStorage.CODIGOCLIENTE,
        codigoSimulacion: sessionStorage.Simulacion
    };
    Object.keys(payload).forEach(key => {
        formData.append(key, payload[key]);
    });
    const response = await fetch('/Aprobado/Obtener', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();

    if (!result.result) return;

    pintarDatos(result.data.aprobado);
}


/* =========================
   PINTAR UI DINÁMICA
========================= */
function pintarDatos(ofertas) {

    const moneda = sessionStorage.MONEDA || "S/";
    const monto = sessionStorage.MONTOSOLICITADO;

    const montoEl = document.getElementById('montoSolicitado');
    const colAnios = document.getElementById('colAnios');
    const colCuotas = document.getElementById('colCuotas');

    // limpiar
    colAnios.innerHTML = '';
    colCuotas.innerHTML = '';

    // monto principal
    montoEl.textContent = `${moneda} ${money(monto)}`;

    const codigos = [];

    ofertas.forEach(item => {

        codigos.push(item.codigoaprobado);

        colAnios.insertAdjacentHTML('beforeend', `
            <div class="bb-row">
                <div class="bb-row-label">En ${item.anios} años</div>
                <div class="bb-row-line"></div>
            </div>
        `);

        colCuotas.insertAdjacentHTML('beforeend', `
            <div class="bb-row">
                <div class="bb-row-label">
                    ${moneda} ${money(item.cuota)}
                </div>
                <div class="bb-row-line"></div>
            </div>
        `);
    });

    // guardar TODOS los códigos en el botón
    const btn = document.querySelector('.btn-loquiero');
    btn.dataset.ids = JSON.stringify(codigos);
}


/* =========================
   BOTÓN WHATSAPP
========================= */
document.addEventListener('click', function (e) {
    debugger;
    const btn = e.target.closest('.btn-loquiero');
    if (!btn) return;

    e.preventDefault();

    const codigos = JSON.parse(btn.dataset.ids);

    Loquiero(codigos);
});


/* =========================
   ENVIAR AL BACKEND
========================= */
async function Loquiero(codigosAprobados) {

    const payload = {
        codigocliente: sessionStorage.CODIGOCLIENTE,
        codigosaprobados: codigosAprobados,
        utm: sessionStorage.UTM,
        CodigoLog : sessionStorage.GUID
    };
    const formData = new FormData();

    Object.keys(payload).forEach(key => {
        formData.append(key, payload[key]);
    });
    const response = await fetch('/Aprobado/RegistrarOferta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();
    
    IrWhatsapp(result.data.telefonoEjecutivo)
    if (!result.result) {
        alert('Error registrando oferta');
        return;
    }

   // window.location.href = "/Gracias";
}
function IrWhatsapp(WHATSAPP) {
    /*alert(sessionStorage.PROYECTO);*/

    //var texto = "Hola, mi nombre es " + sessionStorage.CLIENTE + " ";

    //if (flujo == 1) {
    //    if (sessionStorage.PROYECTO == "") {
    //        texto += "estoy interesado en obtener un crédito"
    //    } else {
    //        texto += "estoy interesado en obtener un crédito del proyecto " //+ sessionStorage.PROYECTO
    //    }
    //} else {
    //    if (sessionStorage.PROYECTO == "") {
    //        texto += "requiero asesoría para obtener un crédito"
    //    } else {
    //        texto += "requiero asesoría para obtener un crédito del  proyecto " // + sessionStorage.PROYECTO
    //    }
    //}

    //texto += ". Monto: " + sessionStorage.MONEDA + " " + numberWithCommas(montoaprobado) + " | Plazo: " + anios + " años | DNI: " + sessionStorage.DOCUMENTO + " | Ingresos: " + sessionStorage.IngresoMensual;

    var link = "https://wa.me/51" + WHATSAPP ;
    
    window.open(link, '_blank');
}