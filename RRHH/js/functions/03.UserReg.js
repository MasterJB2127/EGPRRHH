function Registrar() {
    //FALTA AGREGAR DPI DEL JEFE
    var _dpiJ = atob(localStorage.getItem("key2"));
    var _dpi = $('#dpi').val();
    var _nombre = $('#nombre').val();
    var _apellido = $('#apellido').val();
    var _cargo = $('#permisos').val();
    var _fecha = $('#fecha').val();
    var _correo = $('#correo').val();
    var _jefe = $('#jefe').val();
    var _depto = $('#depto').val();

    $.post("http://localhost:63642/api/URegister", {
        DPI: _dpi,
        Nombres: _nombre,
        Apellidos: _apellido,
        ApellidoC: "",
        Fecha: _fecha,
        Id_Jefe: _jefe,
        Correo: _correo,
        Rol: _cargo,
        Departamento: _depto,
        DPIJ: _dpiJ
    }, function (result) {
        if (result == 3) {
            esperar();
            setTimeout(function () {
                Completado("USUARIO REGISTRADO CORRECTAMENTE");
            }, 4500);
            setTimeout(function () {
                location.reload()
            }, 7000)
        } else {
            error(result.InnerException.Errors[0].message)
        }
    }
    )
}

function VerUsuarios() {
    const xhtttp = new XMLHttpRequest();

    xhtttp.open('GET', 'http://localhost:63642/api/V_Users', true);
    xhtttp.send();

    xhtttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText);

            let res = document.querySelector('#datos');
            var selector = $('#selector').val();;
            res.innerHTML = '';
            var cont = 0;
            for (let item of datos) {
                cont++;
                var user = item.Nombres.toUpperCase();
                if (selector == '') {
                    res.innerHTML += `<tr class="selected" id="fila${cont}"  onclick="selectUser(this.id)">
                    <td>${item.DPI}</td>
                    <td>${item.Nombres}</td>
                    <td>${item.Rol}</td>
                    </tr>`
                }else if(user.toUpperCase().indexOf(selector.toUpperCase())>-1){
                    res.innerHTML += `<tr class="selected" id="fila${cont}"  onclick="selectUser(this.id)">
                    <td>${item.DPI}</td>
                    <td>${item.Nombres}</td>
                    <td>${item.Rol}</td>
                    </tr>`
                }
            }
        }
    }
}

function selectUser(id_fila) {
    if (event.target.tagName == "TD") {
        var fila = event.target.parentNode;
        var cod1 = fila.children[0].innerHTML;
        document.getElementById('jefe').value = cod1;
    }
}


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