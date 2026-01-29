document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('wsp');
    if (!modal) return;

    if (!location.hash) {
        location.hash = '#wsp';
    }
    function numberWithCommas(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
    debugger;
    $('#montoSolicitado').html(sessionStorage.MONEDA + " " + numberWithCommas(sessionStorage.MONTOSOLICITADO));
});