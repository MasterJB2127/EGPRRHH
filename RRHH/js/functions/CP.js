function change() {
    var user = atob(localStorage.getItem("key2"));
    var Ap = $("#AP").val();
    var Np = $("#NP").val();
    var Cp = $("#CP").val();
    if (Np == Cp) {
        $.post("http://localhost:63642/api/CONTRA", {
            oldP: Ap,
            newP: Np,
            DPI: user
        }, function (result) {

            if (result == 1) {
                esperar();
                setTimeout(function () {
                    Completado();
                }, 4500);
                setTimeout(function () {
                    location.reload()
                }, 7000)
            } else {
                error(result.InnerException.Errors[0].message)
            }

        }
        )
    } else {
        error('LA CONFIRMACION DE CONTRASEÑA NO COINCIDE')
    }
}
function Completado() {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    toastr["success"]("Actualización completada");
}

function esperar() {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr["info"]("Procesando Información", "ESPERE")
}

function error(E) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr["error"](E, "ERROR")
}