// wwwroot/js/core/tooltips.js
document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.banbif-has-info').forEach(group => {
        const btn = group.querySelector('.banbif-info-btn');
        const tip = group.querySelector('.banbif-info-tip');
        if (!btn || !tip) return;

        btn.addEventListener('mouseenter', () => tip.classList.add('is-open'));
        btn.addEventListener('mouseleave', () => tip.classList.remove('is-open'));
        btn.addEventListener('focus', () => tip.classList.add('is-open'));
        btn.addEventListener('blur', () => tip.classList.remove('is-open'));
    });

});
