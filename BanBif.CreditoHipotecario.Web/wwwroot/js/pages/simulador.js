document.addEventListener('DOMContentLoaded', () => {

    // ===============================
    // INIT
    // ===============================
    initCustomSelect('tipoVivienda');
    initCustomSelect('tipoIngreso');

    const form = document.getElementById('formCotizacion');
    if (!form) return;

    // ===============================
    // HELPERS
    // ===============================
    function formatearMoneda(valor) {
        if (!valor) return '';
        const n = Number(valor.replace(/,/g, ''));
        if (isNaN(n)) return '';
        return n.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function getNumero(input) {
        return Number(input.value.replace(/,/g, '')) || 0;
    }

    function limpiarError(input, idError) {
        input.classList.remove('banbif-input-error');
        document.getElementById(idError)?.classList.add('banbif-none');
    }

    // ===============================
    // INPUT NUMÉRICO CON FORMATO
    // ===============================
    function inputMoneda(input, idError) {
        input.addEventListener('focus', () => {
            limpiarError(input, idError);
            input.value = input.value.replace(/,/g, '');
        });

        input.addEventListener('input', () => {
            limpiarError(input, idError);
            input.value = input.value.replace(/[^\d]/g, '');
        });

        input.addEventListener('blur', () => {
            if (input.value) {
                input.value = formatearMoneda(input.value);
            }
        });
    }

    inputMoneda(form.valorInmueble, 'errorValorInmueble');
    inputMoneda(form.inicial, 'errorInicial');
    inputMoneda(form.ingreso, 'errorIngreso');

    // ===============================
    // CÁLCULO FINANCIADO
    // ===============================
    function calcularFinancia() {
        const valor = getNumero(form.valorInmueble);
        const inicial = getNumero(form.inicial);

        if (valor > 0 && inicial >= 0) {
            const r = valor - inicial;
            form.financia.value = r > 0 ? formatearMoneda(r.toString()) : '';
        } else {
            form.financia.value = '';
        }
    }

    form.valorInmueble.addEventListener('input', calcularFinancia);
    form.inicial.addEventListener('input', calcularFinancia);

    // ===============================
    // VALIDACIÓN CUOTA INICIAL
    // ===============================
    function validarInicialVacio() {
        const inicial = getNumero(form.inicial);
        if (!inicial) {
            mostrarErrorInicial('Ingresa la cuota inicial.');
            return false;
        }
        return true;
    }

    function validarInicialReglas() {
        const valor = getNumero(form.valorInmueble);
        const inicial = getNumero(form.inicial);

        if (!valor || !inicial) return true;

        const minimo = valor * 0.10;

        if (inicial < minimo) {
            mostrarErrorInicial(`La cuota inicial debe ser al menos el 10% (${formatearMoneda(minimo.toString())}).`);
            return false;
        }

        if (inicial >= valor) {
            mostrarErrorInicial('La cuota inicial no puede ser mayor o igual al valor del inmueble.');
            return false;
        }

        limpiarError(form.inicial, 'errorInicial');
        return true;
    }

    function mostrarErrorInicial(mensaje) {
        const error = document.getElementById('errorInicial');
        error.textContent = mensaje;
        error.classList.remove('banbif-none');
        form.inicial.classList.add('banbif-input-error');
    }

    form.inicial.addEventListener('blur', validarInicialReglas);
    form.valorInmueble.addEventListener('blur', validarInicialReglas);

    // ===============================
    // SELECTS
    // ===============================
    function validarSelect(name) {
        const select = form.querySelector(`select[name="${name}"]`);
        const ui = document.querySelector(`.banbif-select-ui[data-for="${name}"]`);
        const error = document.getElementById(`error_${name}`);

        if (!select.value) {
            ui?.classList.add('has-error');
            select.classList.add('banbif-input-error');
            error?.classList.remove('banbif-none');
            return false;
        }

        ui?.classList.remove('has-error');
        select.classList.remove('banbif-input-error');
        error?.classList.add('banbif-none');
        return true;
    }

    ['tipoVivienda', 'tipoIngreso'].forEach(name => {
        form.querySelector(`select[name="${name}"]`)
            ?.addEventListener('change', () => validarSelect(name));
    });

    // ===============================
    // RADIOS
    // ===============================
    function validarRadios(name, idError) {
        const radios = form.querySelectorAll(`input[name="${name}"]`);
        const ok = [...radios].some(r => r.checked);
        document.getElementById(idError)?.classList.toggle('banbif-none', ok);
        return ok;
    }

    ['compartirCuota', 'inmuebleDef'].forEach(name => {
        form.querySelectorAll(`input[name="${name}"]`).forEach(r => {
            r.addEventListener('change', () => {
                document.getElementById(`error_${name}`)?.classList.add('banbif-none');
            });
        });
    });

    // ===============================
    // VALIDAR NUMÉRICOS
    // ===============================
    function validarNumero(name, idError) {
        const input = form.querySelector(`input[name="${name}"]`);
        const ok = input.value.replace(/,/g, '').trim() !== '';
        input.classList.toggle('banbif-input-error', !ok);
        document.getElementById(idError)?.classList.toggle('banbif-none', ok);
        return ok;
    }

    // ===============================
    // SUBMIT FINAL
    // ===============================
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        debugger;
        let ok = true;

        ok = validarSelect('tipoVivienda') && ok;
        ok = validarSelect('tipoIngreso') && ok;

        ok = validarNumero('valorInmueble', 'errorValorInmueble') && ok;
        ok = validarInicialVacio() && ok;
        ok = validarInicialReglas() && ok;
        ok = validarNumero('ingreso', 'errorIngreso') && ok;

        ok = validarRadios('compartirCuota', 'error_compartirCuota') && ok;
        ok = validarRadios('inmuebleDef', 'error_inmuebleDef') && ok;

        if (!ok) return;
  
        sessionStorage.MONTOSOLICITADO = getNumero(form.financia);
        debugger;
        const payload = {
            CodigoCliente: Number(sessionStorage.getItem('CODIGOCLIENTE')) || 0,
            Moneda: Number(form.moneda.value), // 1 soles / 2 dólares
            ValorInmueble: getNumero(form.valorInmueble),
            DineroNecesita: getNumero(form.financia),
            IngresoMensual: getNumero(form.ingreso),
            TipoIngreso: Number(form.tipoIngreso.value),
            CompartirCuota: form.compartirCuota.value === '1',
            InmuebleComprar: form.inmuebleDef.value === '1',

            FlagTerminos: sessionStorage.TERMINOS === "true",
            FlagDatos: sessionStorage.DATOSPERSONALES === "true",
            PrimeraVivienda: Number(form.tipoVivienda.value),
            MontoInicial: getNumero(form.inicial),
            
        };

        enviarSimulacion(payload);
    });

});


async function enviarSimulacion(payload) {

    const formData = new FormData();

    Object.keys(payload).forEach(key => {
        formData.append(key, payload[key]);
    });

    try {
        const response = await fetch('/Simulador/Simular', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();

        if (result.result) {
            sessionStorage.setItem('Simulacion', result.data.codigosimulacion);
            window.location.href = '/Aprobado';
        } else {
            alert('Ocurrió un error al procesar la simulación.');
        }

    } catch (err) {
        console.error(err);
        alert('No se pudo conectar con el servidor.');
    }
}
