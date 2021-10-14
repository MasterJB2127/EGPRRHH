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
    Dias_P();
});

function Dias_P(){
    const xhtttp = new XMLHttpRequest();
    var _dpi = atob(localStorage.getItem("key2"));
    xhtttp.open('GET', 'http://localhost:63642/api/DiasP', true);
    xhtttp.send();

    xhtttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText);
            for (let item of datos) {
                if(item.DPI == _dpi){
                    $('#V').val(item.Vacaciones);
                    $('#PE').val(item.Permiso);
                }
            }
        }

    } 
}

var D;
var user;
function Registrar() {

    var _FI = $('#FI').val();
    var _FF = $('#FF').val();
    var _DPI = $('#DPI').val();
    var _TP = $('#permisos').val();
    var _obs = $('#obs').val();
    var _IF = $('#inputFile').val();
    console.log(_FI)

    if (_obs == null) {
        _obs = "";
    }
    var _TP = $('#permisos').val();
    var fecha = new Date($('#FI').val());
    fecha.setDate(fecha.getDate() + 1);
    var qdia = fecha.getDay();
    if (qdia != 0 && qdia != 6 && _FI != '') {
        if (_IF != '') {
            if (_TP == 6){
                if (qdia == 1) {
                    var FI = $('#FI').val()
                    var FF = $('#FF').val()
                    var fecha1 = moment(FI);
                    var fecha2 = moment(FF);
                    diaspe = fecha2.diff(fecha1, 'days')+1;
                    D=diaspe;
                    console.log(diaspe, ' dias de diferencia');
                }else if (qdia >= 2 && qdia <= 5) {
                    var FI = $('#FI').val()
                    var FF = $('#FF').val()
                    var fecha1 = moment(FI);
                    var fecha2 = moment(FF);
                    diaspe = fecha2.diff(fecha1, 'days')+1-2;
                    D=diaspe;
                    console.log(diaspe, ' dias de diferencia');
                }else{
                    diaspe = 0;
                }
            }else{
                diaspe=0;
            }
            $.post("http://localhost:63642/api/RequestRegister", {
                Fecha_Inicial: _FI,
                Fecha_Final: _FF,
                DPI: _DPI,
                Id_Permiso: _TP,
                Observaciones: _obs,
                DiasPE: diaspe,
                DiasS: D
            }, function (result) {

                if (result >=1) {
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
                                                        if (result == 1) {
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
        } else {
            error('DEBE CARGAR UN ARCHIVO DE SOLICITUD DE PERMISO');
        }
    } else {
        error('ELIJA UNA FECHA VALIDA')
    }

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
                            setTimeout(function () {
                                location.reload();
                            }, 6500);
                            
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

function inab() {
    let res = document.querySelector('#ff');
    res.innerHTML = '';
    var _TP = $('#permisos').val();
    $('#FI').val('')
            $('#FF').val('')
    if (_TP == 6) {
        res.innerHTML = '<h4 style="color:black; text-align: center; ">FECHA FINAL DEL PERMISO:</h4><br> <input type="date" style="text-align: center; " class="form-control col-12" id="FF" required></input>';
    } else {
        res.innerHTML = '<h4 style="color:black; text-align: center; ">FECHA FINAL DEL PERMISO:</h4><br><input type="date" style="text-align: center; " class="form-control col-12" id="FF" required disabled></input>';
    }
}
var diaspe;
function Fecha_C() {
    var _TP = $('#permisos').val();
    var fecha = new Date($('#FI').val());
    fecha.setDate(fecha.getDate() + 1);
    var qdia = fecha.getDay();
    diaspe = 0;
    if (_TP == 1) {
        D = 15;
        if($('#V').val() > 0){
            if (qdia == 1) {
                var dias = 18;
                var nuevafecha;
                fecha.setDate(fecha.getDate() + dias);
                var dia = fecha.getDate();
                var mes = fecha.getMonth() + 1;
                if (dia < 10) {
                    nuevafecha = fecha.getFullYear() + '-' + mes + '-0' + dia;
                } else {
                    nuevafecha = fecha.getFullYear() + '-' + mes + '-' + dia;
                }
                document.getElementById('FF').value = nuevafecha;
            } else if (qdia > 1 && qdia < 6) {
                var dias = 20;
                var nuevafecha;
                fecha.setDate(fecha.getDate() + dias);
                var dia = fecha.getDate();
                var mes = fecha.getMonth() + 1;
                if (dia < 10) {
                    nuevafecha = fecha.getFullYear() + '-' + mes + '-0' + dia;
                } else {
                    nuevafecha = fecha.getFullYear() + '-' + mes + '-' + dia;
                }
                document.getElementById('FF').value = nuevafecha;
            } else {
                $('#FI').val('')
                $('#FF').val('')
                error('NO ES VALIDO SELECCIONAR FINES DE SEMANA COMO FECHA INICIAL');
            }
        }else{
            error('NO CUENTA CON DIAS DISPONIBLES DE VACACIONES')
            $('#FI').val('')
                $('#FF').val('')
        }
    } else if (_TP == 2) {
        D=3;
        if (qdia >= 1 && qdia <= 3) {
            var dias = 2;
            var nuevafecha;
            fecha.setDate(fecha.getDate() + dias);
            var dia = fecha.getDate();
            var mes = fecha.getMonth() + 1;
            if (dia < 10) {
                nuevafecha = fecha.getFullYear() + '-' + mes + '-0' + dia;
            } else {
                nuevafecha = fecha.getFullYear() + '-' + mes + '-' + dia;
            }
            document.getElementById('FF').value = nuevafecha;
        } else if (qdia >= 4 && qdia <= 5) {
            var dias = 4;
            var nuevafecha;
            fecha.setDate(fecha.getDate() + dias);
            var dia = fecha.getDate();
            var mes = fecha.getMonth() + 1;
            if (dia < 10) {
                nuevafecha = fecha.getFullYear() + '-' + mes + '-0' + dia;
            } else {
                nuevafecha = fecha.getFullYear() + '-' + mes + '-' + dia;
            }
            document.getElementById('FF').value = nuevafecha;
        } else {
            $('#FI').val('')
            $('#FF').val('')
            error('NO ES VALIDO SELECCIONAR FINES DE SEMANA COMO FECHA INICIAL');
        }
    } else if (_TP == 3) {
        D=2;
        if (qdia >= 1 && qdia <= 4) {
            var dias = 1;
            var nuevafecha;
            fecha.setDate(fecha.getDate() + dias);
            var dia = fecha.getDate();
            var mes = fecha.getMonth() + 1;
            if (dia < 10) {
                nuevafecha = fecha.getFullYear() + '-' + mes + '-0' + dia;
            } else {
                nuevafecha = fecha.getFullYear() + '-' + mes + '-' + dia;
            }
            document.getElementById('FF').value = nuevafecha;
        } else if (qdia == 5) {
            var dias = 3;
            var nuevafecha;
            fecha.setDate(fecha.getDate() + dias);
            var dia = fecha.getDate();
            var mes = fecha.getMonth() + 1;
            if (dia < 10) {
                nuevafecha = fecha.getFullYear() + '-' + mes + '-0' + dia;
            } else {
                nuevafecha = fecha.getFullYear() + '-' + mes + '-' + dia;
            }
            document.getElementById('FF').value = nuevafecha;
        } else {
            $('#FI').val('')
            $('#FF').val('')
            error('NO ES VALIDO SELECCIONAR FINES DE SEMANA COMO FECHA INICIAL');
        }
    } else if (_TP == 4) {
        D=1;
        if (qdia >= 1 && qdia <= 5) {
            var dias = 0;
            var nuevafecha;
            fecha.setDate(fecha.getDate() + dias);
            var dia = fecha.getDate();
            var mes = fecha.getMonth() + 1;
            if (dia < 10) {
                nuevafecha = fecha.getFullYear() + '-' + mes + '-0' + dia;
            } else {
                nuevafecha = fecha.getFullYear() + '-' + mes + '-' + dia;
            }
            document.getElementById('FF').value = nuevafecha;
        } else {
            $('#FI').val('')
            $('#FF').val('')
            error('NO ES VALIDO SELECCIONAR FINES DE SEMANA COMO FECHA INICIAL');
        }
    } else if (_TP == 5) {
        D=5;
        if (qdia == 1) {
            var dias = 4;
            var nuevafecha;
            fecha.setDate(fecha.getDate() + dias);
            var dia = fecha.getDate();
            var mes = fecha.getMonth() + 1;
            if (dia < 10) {
                nuevafecha = fecha.getFullYear() + '-' + mes + '-0' + dia;
            } else {
                nuevafecha = fecha.getFullYear() + '-' + mes + '-' + dia;
            }
            document.getElementById('FF').value = nuevafecha;
        } else if (qdia >= 2 && qdia <= 5) {
            var dias = 6;
            var nuevafecha;
            fecha.setDate(fecha.getDate() + dias);
            var dia = fecha.getDate();
            var mes = fecha.getMonth() + 1;
            if (dia < 10) {
                nuevafecha = fecha.getFullYear() + '-' + mes + '-0' + dia;
            } else {
                nuevafecha = fecha.getFullYear() + '-' + mes + '-' + dia;
            }
            document.getElementById('FF').value = nuevafecha;
        } else {
            $('#FI').val('')
            $('#FF').val('')
            error('NO ES VALIDO SELECCIONAR FINES DE SEMANA COMO FECHA INICIAL');
        }
    } else if (_TP == 6) {
        if($('#V').val() == 0){
            error('NO CUENTA CON DIAS DISPONIBLES PARA PERMISO ESPECIAL')
            $('#FI').val('')
                $('#FF').val('')
        }
        if (qdia == 0 || qdia == 6) {
            $('#FI').val('')
            $('#FF').val('')
            error('NO ES VALIDO SELECCIONAR FINES DE SEMANA COMO FECHA INICIAL');
        }
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