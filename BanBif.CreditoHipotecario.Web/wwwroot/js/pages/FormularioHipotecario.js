document.addEventListener('DOMContentLoaded', function () {

    function validardni() {
        const input = document.getElementById("dni");
        const error = document.getElementById("errorDNI");
        const regex = /^[0-9]{8}$/;

        if (regex.test(input.value)) {
            error.classList.add("banbif-none");
            input.classList.remove("banbif-input-error");
            return true;
        } else {
            error.classList.remove("banbif-none");
            input.classList.add("banbif-input-error");
            return false;
        }
    }

    function validarphone() {
        const input = document.getElementById("phone");
        const error = document.getElementById("errorPhoneFormato");
        const regex = /^[0-9]{9}$/;

        if (regex.test(input.value)) {
            error.classList.add("banbif-none");
            input.classList.remove("banbif-input-error");
            return true;
        } else {
            error.classList.remove("banbif-none");
            input.classList.add("banbif-input-error");
            return false;
        }
    }

    function validaremail() {
        const input = document.getElementById("email");
        const error = document.getElementById("errorEmailFormato");
        const regex = /^[^\s@]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]{2,}$/;

        if (regex.test(input.value.trim())) {
            error.classList.add("banbif-none");
            input.classList.remove("banbif-input-error");
            return true;
        } else {
            error.classList.remove("banbif-none");
            input.classList.add("banbif-input-error");
            return false;
        }
    }

    function validarEstadoCivil() {
        const select = document.getElementById("estadoCivil");
        const error = document.getElementById("errorEstadoCivil");

        if (select.value) {
            error.classList.add("banbif-none");
            select.classList.remove("banbif-input-error");
            return true;
        } else {
            error.classList.remove("banbif-none");
            select.classList.add("banbif-input-error");
            return false;
        }
    }

    function validarCheckbox() {
        const checkbox = document.getElementById("condicion1");
        const error = document.querySelector(".message-check");

        if (checkbox.checked) {
            error.classList.add("banbif-none");
            return true;
        } else {
            error.classList.remove("banbif-none");
            return false;
        }
    } 

    document.getElementById("dni").addEventListener("blur", validardni);
    document.getElementById("phone").addEventListener("blur", validarphone);
    document.getElementById("email").addEventListener("blur", validaremail);
    document.getElementById("estadoCivil").addEventListener("change", validarEstadoCivil);
  /*  document.getElementById("condicion1").addEventListener("change", validarCheckbox);*/

    document.getElementById("form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const dni = document.getElementById("dni");
        const phone = document.getElementById("phone");
        const email = document.getElementById("email");
        const c0 = document.getElementById("condicion0");
        const c1 = document.getElementById("condicion1");
        debugger;
        // 🔥 FORZAR TODAS LAS VALIDACIONES VISUALES
        const ok =
            validardni() &
            validarphone() &
            validaremail() &
            validarEstadoCivil() &
            validarCheckboxes() &
            validarCheckboxes1();

        if (!ok) {
            const firstError = document.querySelector(".banbif-input-error");
            firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
            firstError?.focus();
            return;
        }

        // 🔐 PAYLOAD (igual que tu on-premise)
        const payload = {
            documento: dni.value,
            celular: phone.value,
            correo: email.value,
            tipoIngreso: window.APP_CONFIG.tipoIngreso
        };

        const btn = document.getElementById("btnNext");
        const loader = document.getElementById("loading");

        btn.disabled = true;
        loader?.classList.remove("banbif-none");

        try {
            const response = await fetch("/Login/Login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            

            if (!response.ok) {
                throw new Error("Error de comunicación");
            }

            const result = await response.json();

            if (result.result) {
                // ✅ MISMO COMPORTAMIENTO QUE ANTES
                sessionStorage.CODIGOCLIENTE = result.data.codigocliente;
                sessionStorage.CLIENTE = result.data.cliente;
                sessionStorage.FLUJO = result.data.flujo;
                sessionStorage.MONTO = result.data.montoaprobado;
                sessionStorage.MONEDA = "S/";
                sessionStorage.MONTODOLARES = parseInt(result.data.montoaprobadodolares);
                sessionStorage.FLAGCLIENTE = result.data.flagcliente;
                sessionStorage.TERMINOS = c0.checked;
                sessionStorage.DATOSPERSONALES = c1.checked;

                window.location.href = `${window.APP_CONFIG.appUrl}/Simulador`;
            } else {
                alert("Los datos ingresados no son válidos.");
            }

        } catch (err) {
            console.error(err);
            alert("Ocurrió un error. Intenta nuevamente.");
        } finally {
            btn.disabled = false;
            loader?.classList.add("banbif-none");
        }
    });


});

function validaNumericos(e) {
    return e.charCode >= 48 && e.charCode <= 57;
}
function toggleError(id, show) {
    const el = document.getElementById(id);
    if (!el) return;
    if (show) el.classList.remove("banbif-none");
    else el.classList.add("banbif-none");
}

function validarCheckboxes() {
    const c0 = document.getElementById("condicion0");
    const c1 = document.getElementById("condicion1");
    const c2 = document.getElementById("condicion2");

    const ok0 = c0 && c0.checked;

    toggleError("errorCond0", !ok0);

    return ok0 ;
}
function validarCheckboxes1() {
    const c0 = document.getElementById("condicion0");
    const c1 = document.getElementById("condicion1");
    const c2 = document.getElementById("condicion2");

    const ok1 = c1 && c1.checked;

    toggleError("errorCond1", !ok1);

    return  ok1;
}
document.getElementById("condicion0")?.addEventListener("change", validarCheckboxes);
document.getElementById("condicion1")?.addEventListener("change", validarCheckboxes1);
document.getElementById("condicion2")?.addEventListener("change", function () {
    toggleError("errorCond2", false);
});

document.addEventListener('DOMContentLoaded', () => {
    const ui = document.querySelector('.banbif-select-ui[data-for="estadoCivil"]');
    if (!ui) return;

    const btn = ui.querySelector('.banbif-select-btn');
    const label = ui.querySelector('.banbif-select-label');
    const panel = ui.querySelector('.banbif-select-panel');
    const opts = [...ui.querySelectorAll('.banbif-opt')];
    const overlay = ui.parentElement.querySelector('.banbif-select-overlay'); // dentro del wrap
    const real = document.getElementById('estadoCivil');
    const error = document.getElementById('errorEstadoCivil');
    const form = document.getElementById('form');

    const open = () => {
        ui.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
    };

    const close = () => {
        ui.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
    };

    btn.addEventListener('click', () => {
        ui.classList.contains('is-open') ? close() : open();
    });

    overlay?.addEventListener('click', close);

    opts.forEach(opt => {
        opt.addEventListener('click', () => {
            const value = opt.dataset.value;
            const text = opt.textContent.trim();

            // set real select (submit/required)
            real.value = value;
            real.dispatchEvent(new Event('change', { bubbles: true }));

            // UI
            label.textContent = text;
            opts.forEach(o => o.classList.remove('is-active'));
            opt.classList.add('is-active');

            // limpiar error
            ui.classList.remove('has-error');
            real.classList.remove('banbif-input-error');
            error?.classList.add('banbif-none');

            close();
        });
    });

    // ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });

    // Validación al submit (sin duplicar tu lógica, solo sincroniza borde rojo)
    form?.addEventListener('submit', (e) => {
        if (!real.value) {
            ui.classList.add('has-error');
            real.classList.add('banbif-input-error');
            error?.classList.remove('banbif-none');
            close();
        }
    });

    // Si tu validador original marca error en el select real, refleja al custom
    real.addEventListener('change', () => {
        if (real.value) {
            ui.classList.remove('has-error');
            real.classList.remove('banbif-input-error');
            error?.classList.add('banbif-none');
        }
    });
});