function Completado(E) {
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
    toastr["success"](E);
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

function find() {
    const xhtttp = new XMLHttpRequest();
    xhtttp.open('GET', 'http://localhost:63642/api/Bitacora', true);
    xhtttp.send();
    xhtttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText);
            var selector = $('#buscar').val();
            var _date = $('#fecha').val();
            var key = 0;
            let res = document.querySelector('#datos');
            res.innerHTML = '';
            var cont = 0;
            for (let item of datos) {
                cont++;
                var desc = item.Descripcion.toUpperCase();
                var fecha = item.Fecha.slice(0, -9);
                if (selector != "" && _date != "") {
                    key = 2;
                } else if (selector != "") {
                    if (desc.indexOf(selector.toUpperCase()) > -1) {
                        res.innerHTML += `<tr class="selected" style="font-size: x-small;" id="fila${cont}">
                        <td>${item.Fecha.slice(0, -9)}</td>
                        <td>${item.Descripcion}</td>
                        <td>${item.Usuario}</td>
                        </tr>`
                        key = 1;
                    }
                } else if (_date != "") {
                    if (fecha == _date) {
                        res.innerHTML += `<tr class="selected" style="font-size: x-small;" id="fila${cont}">
                        <td>${item.Fecha.slice(0, -9)}</td>
                        <td>${item.Descripcion}</td>
                        <td>${item.Usuario}</td>
                        </tr>`
                        key = 1;
                    }
                } else if (selector == "" && _date == "") {
                    res.innerHTML += `<tr class="selected" style="font-size: x-small;" id="fila${cont}">
                    <td>${item.Fecha.slice(0, -9)}</td>
                    <td>${item.Descripcion}</td>
                    <td>${item.Usuario}</td>
                        </tr>`
                    key = 1;
                }
            }
            if (key == 0) {
                error('No se encontraron coincidencias');
            } else if (key == 2) {
                error('SELECCIONE SOLO UNA OPCIÓN DE BUSQUEDA')
            }
        }
    }
}

function clean() {
    document.getElementById('buscar').value = "";
    document.getElementById('fecha').value = "";
}