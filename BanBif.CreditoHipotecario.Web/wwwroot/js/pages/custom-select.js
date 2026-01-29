// wwwroot/js/core/custom-select.js
document.addEventListener('DOMContentLoaded', () => {

    window.initCustomSelect = function (name) {


        const ui = document.querySelector(`.banbif-select-ui[data-for="${name}"]`);
        if (!ui) return;

        const btn = ui.querySelector('.banbif-select-btn');
        const label = ui.querySelector('.banbif-select-label');
        const opts = [...ui.querySelectorAll('.banbif-opt')];
        const overlay = ui.nextElementSibling;
        //const real = ui.parentElement.querySelector(`select[name="${name}"]`);
        //const error = document.getElementById(`error_${name}`);

        const open = () => ui.classList.add('is-open');
        const close = () => ui.classList.remove('is-open');

        const fieldName = ui.dataset.for;
        const real = document.querySelector(`select[name="${fieldName}"]`);
        const error = document.getElementById(`error_${fieldName}`);


        btn.addEventListener('click', () => ui.classList.contains('is-open') ? close() : open());
        overlay?.addEventListener('click', close);

        //opts.forEach(opt => {
        //    opt.addEventListener('click', () => {
        //        real.value = opt.dataset.value;
        //        real.dispatchEvent(new Event('change', { bubbles: true }));
        //        label.textContent = opt.textContent.trim();
        //        opts.forEach(o => o.classList.remove('is-active'));
        //        opt.classList.add('is-active');
        //        error?.classList.add('banbif-none');
        //        close();
        //    });
        //});

        opts.forEach(opt => {
            opt.addEventListener('click', () => {
                const value = opt.dataset.value;
                const text = opt.textContent.trim();

                // 🔥 asignar valor REAL
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


    };

});
