const firebaseConfig = {
    apiKey: "AIzaSyAILCLhTEZMnpShRq-XiymilXJwTaaKdIA",
    authDomain: "egp2021-c915e.firebaseapp.com",
    databaseURL: "https://egp2021-c915e-default-rtdb.firebaseio.com/",
    projectId: "egp2021-c915e",
    storageBucket: "egp2021-c915e.appspot.com",
    messagingSenderId: "159597821211",
    appId: "1:159597821211:web:c7895a2ec566eded4827be"
};

firebase.initializeApp(firebaseConfig);

$(document).ready(function permiso() {
    var _dpi = atob(localStorage.getItem("key2"));
    document.getElementById('DPI').value = _dpi;
});

var user;

function Registrar() {

    var _FI = $('#FI').val();
    var _FF = $('#FF').val();
    var _DPI = $('#DPI').val();
    var _TP = $('#permisos').val();
    var _obs = $('#obs').val();

    if (_obs == null) {
        _obs = "";
    }

    $.post("http://localhost:63642/api/RequestRegister", {
        Fecha_Inicial: _FI,
        Fecha_Final: _FF,
        DPI: _DPI,
        Id_Permiso: _TP,
        Observaciones: _obs
    }, function (result) {

        if (result == 1 || result == 2) {
            insertar();
            const xhtttp = new XMLHttpRequest();
            var _dpi = atob(localStorage.getItem("key2"));
            xhtttp.open('GET', 'http://localhost:63642/api/V_Empleados', true);
            xhtttp.send();
            xhtttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var datos = JSON.parse(this.responseText);
                    console.log(datos)
                    
                    var cont = 0;
                    for (let item of datos) {
                        cont++;
                        if (item.DPI == _dpi) {
                            var jefe = item.Id_Jefe;
                            user = item.Nombre;
                            const xhtttp = new XMLHttpRequest();
                            xhtttp.open('GET', 'http://localhost:63642/api/V_Users', true);
                            xhtttp.send();
                            xhtttp.onreadystatechange = function () {
                                if (this.readyState == 4 && this.status == 200) {
                                    var datos = JSON.parse(this.responseText);
                                    for (let item of datos) {
                                        if (item.DPI == jefe) {
                                            var mensaje = "TIENE UNA NUEVA SOLICITUD DE PERMISO DEL USUARIO: " + user + ", INGRESE AL SISTEMA PARA REVISAR LA SOLICITUD";
                                            console.log(datos)
                                            console.log(item.Correo);
                                            console.log(mensaje);
                                            $.post("http://localhost:63642/api/Correo", {
                                                CorreoR: item.Correo,
                                                Mensaje: mensaje
                                            }, function (result) {
                                                if(result == 1){
                                                    Completado('NOTIFICACION ENVIADA A SU JEFE INMEDIATO')
                                                }
                                            }
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            error(result.InnerException.Errors[0].message)
        }
    }
    )
}

var file;

function insertar() {
    const xhtttp = new XMLHttpRequest();
    var _dpi = atob(localStorage.getItem("key2"));
    xhtttp.open('GET', 'http://localhost:63642/api/SolicitudP', true);
    xhtttp.send();

    xhtttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText);
            for (let item of datos) {
                if (item.DPI == _dpi) {
                    var data = {
                        DPI: _dpi,
                        Documento: file,
                        id: item.Id_Solicitud
                    }
                    if (navigator.onLine) {
                        var db = firebase.database();
                        if (db.ref('/Solicitudes/' + item.Id_Solicitud).set(data)) {
                            esperar();
                            setTimeout(function () {
                                Completado('SOLICITUD REGISTRADA EXITOSAMENTE');
                            }, 4500);
                        } else {
                            Error('HA OCURRIDO UN ERROR')
                        }
                    } else {
                        alert('No hay Conexión a Internet');
                    }
                }
            }
        }

    }
}

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function convertToBase64() {
    //Read File
    var selectedFile = document.getElementById("inputFile").files;
    //Check File is not Empty
    if (selectedFile.length > 0) {
        // Select the very first file from list
        var fileToLoad = selectedFile[0];
        // FileReader function for read the file.
        var fileReader = new FileReader();
        var base64;
        // Onload of file read the file content
        fileReader.onload = function (fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            // Print data in console
            file = base64;
        };
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
    }
}

function ver() {

    console.log(today)
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