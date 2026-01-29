// wwwroot/js/core/validators.js
window.validators = (() => {

    function validarNumero(nameCampo, idError) {
        const input = document.querySelector(`input[name="${nameCampo}"]`);
        const error = document.getElementById(idError);
        if (!input || !error) return true;

        const valor = input.value.trim();
        const ok = valor !== '' && /^(\d+([.,]\d+)?)$/.test(valor);

        input.classList.toggle('banbif-input-error', !ok);
        error.classList.toggle('banbif-none', ok);
        return ok;
    }

    function validarRadios(nameGrupo, idError) {
        const radios = document.querySelectorAll(`input[name="${nameGrupo}"]`);
        const error = document.getElementById(idError);
        const ok = [...radios].some(r => r.checked);

        error.classList.toggle('banbif-none', ok);
        return ok;
    }

    function validarSelect(nameCampo, idError) {
        const select = document.querySelector(`select[name="${nameCampo}"]`);
        const error = document.getElementById(idError);
        const ok = !!select?.value;

        select?.classList.toggle('banbif-input-error', !ok);
        error?.classList.toggle('banbif-none', ok);
        return ok;
    }

    function validateForm() {
        let ok = true;

        ok = validarNumero('valorInmueble', 'errorValorInmueble') && ok;
        ok = validarNumero('inicial', 'errorInicial') && ok;
        ok = validarNumero('ingreso', 'errorIngreso') && ok;
        ok = validarNumero('financia', 'errorFinancia') && ok;

        ok = validarRadios('compartirCuota', 'error_compartirCuota') && ok;
        ok = validarRadios('inmuebleDef', 'error_inmuebleDef') && ok;

        ok = validarSelect('tipoVivienda', 'error_tipoVivienda') && ok;
        ok = validarSelect('tipoIngreso', 'error_tipoIngreso') && ok;

        return ok;
    }

    

    return {
        validarNumero,
        validarRadios,
        validarSelect,
        validateForm
       
    };

})();


function inputMoneda(input) {

    // SOLO NÚMEROS mientras escribe
    input.addEventListener('input', () => {
        input.value = input.value.replace(/[^\d]/g, '');
    });

    // FORMATEAR al salir
    input.addEventListener('blur', () => {
        input.value = formatearMoneda(input.value);
    });

    // Quitar formato al entrar (para editar cómodo)
    input.addEventListener('focus', () => {
        input.value = input.value.replace(/,/g, '');
    });

    // Evitar pegar letras
    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData)
            .getData('text')
            .replace(/[^\d]/g, '');
        document.execCommand('insertText', false, text);
    });
}
