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

function downloadPDF() {
    var binStr = atob(dataPDF.slice(28));
    var len = binStr.length;
    var arr = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }
    var blob = new Blob([arr], { type: "application/pdf" })
    var url = URL.createObjectURL(blob);
    var pdfWindow = window.open("");
    pdfWindow.document.write("<iframe width='100%' height='100%' src='" + url + "'></iframe>");
}

var dataPDF;

function Exped() {

    var _sol = $('#sol').val();

    const menu = firebase.database().ref("Solicitudes/");
    menu.on("value", function (snapshot) {
        $("#datos").empty();

        snapshot.forEach(function (childsnapshot) {
            var data = childsnapshot.val();
            if (_sol == data.id) {
                dataPDF = data.Documento;
                downloadPDF();
            }
        }
        );
    })
}

var keyrol;
$(document).ready(function permiso() {
    keyrol = atob(localStorage.getItem("key1"));
});

function BUSCAR() {

    if (keyrol == 'Administrativo') {
        BUSCAR1();
    } else if (keyrol == 'Gerente') {
        BUSCAR2();
    } else if (keyrol == 'RRHH') {
        BUSCAR3();
    }
}

function BUSCAR1() {
    const xhtttp = new XMLHttpRequest();
    xhtttp.open('GET', 'http://localhost:63642/api/sPendienteJ', true);
    xhtttp.send();
    xhtttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText);
            var selector = $('#buscar').val();
            let res = document.querySelector('#datos');
            res.innerHTML = '';
            var cont = 0;
            for (let item of datos) {
                cont++;
                if (selector == '') {
                    res.innerHTML += `<tr style="font-size: small;" class="selected" id="fila${cont}"  onclick="selectUser(this.id)">
                    <td>${item.Id_Solicitud}</td>    
                    <td>${item.DPI}</td>
                    <td>${item.Nombre}</td>
                    <td>${item.Fecha_Solicitud.slice(0, -9)}</td>
                    <td>${item.FechaI_Permiso.slice(0, -9)}</td>
                    <td>${item.FechaF_Permiso.slice(0, -9)}</td>
                    <td>${item.Descripcion}</td>
                        </tr>`
                }
                else if (item.Nombre.toUpperCase().indexOf(selector.toUpperCase()) > -1) {
                    res.innerHTML += `<tr style="font-size: small;" class="selected" id="fila${cont}"  onclick="selectUser(this.id)">
                    <td>${item.Id_Solicitud}</td>  
                    <td>${item.DPI}</td>
                    <td>${item.Nombre}</td>
                    <td>${item.Fecha_Solicitud.slice(0, -9)}</td>
                    <td>${item.FechaI_Permiso.slice(0, -9)}</td>
                    <td>${item.FechaF_Permiso.slice(0, -9)}</td>
                    <td>${item.Descripcion}</td>
                        </tr>`
                }
            }
        }
    }
}

function BUSCAR2() {
    const xhtttp = new XMLHttpRequest();
    xhtttp.open('GET', 'http://localhost:63642/api/sPendienteG', true);
    xhtttp.send();
    xhtttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText);
            var selector = $('#buscar').val();
            let res = document.querySelector('#datos');
            res.innerHTML = '';
            var cont = 0;
            for (let item of datos) {
                cont++;
                if (selector == '') {
                    res.innerHTML += `<tr class="selected" id="fila${cont}"  onclick="selectUser(this.id)">
                    <td>${item.Id_Solicitud}</td>  
                    <td>${item.DPI}</td>
                    <td>${item.Nombre}</td>
                    <td>${item.Fecha_Solicitud.slice(0, -9)}</td>
                    <td>${item.FechaI_Permiso.slice(0, -9)}</td>
                    <td>${item.FechaF_Permiso.slice(0, -9)}</td>
                    <td>${item.Descripcion}</td>
                        </tr>`
                }
                else if (item.Nombre.toUpperCase().indexOf(selector.toUpperCase()) > -1) {
                    res.innerHTML += `<tr class="selected" id="fila${cont}"  onclick="selectUser(this.id)">
                    <td>${item.Id_Solicitud}</td>  
                    <td>${item.DPI}</td>
                    <td>${item.Nombre}</td>
                    <td>${item.Fecha_Solicitud.slice(0, -9)}</td>
                    <td>${item.FechaI_Permiso.slice(0, -9)}</td>
                    <td>${item.FechaF_Permiso.slice(0, -9)}</td>
                    <td>${item.Descripcion}</td>
                        </tr>`
                }
            }
        }
    }
}

function BUSCAR3() {
    const xhtttp = new XMLHttpRequest();
    xhtttp.open('GET', 'http://localhost:63642/api/sPendienteRRHH', true);
    xhtttp.send();
    xhtttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText);
            var selector = $('#buscar').val();
            let res = document.querySelector('#datos');
            res.innerHTML = '';
            var cont = 0;
            for (let item of datos) {
                cont++;
                if (selector == '') {
                    res.innerHTML += `<tr class="selected" id="fila${cont}"  onclick="selectUser(this.id)">
                    <td>${item.Id_Solicitud}</td>  
                    <td>${item.DPI}</td>
                    <td>${item.Nombre}</td>
                    <td>${item.Fecha_Solicitud.slice(0, -9)}</td>
                    <td>${item.FechaI_Permiso.slice(0, -9)}</td>
                    <td>${item.FechaF_Permiso.slice(0, -9)}</td>
                    <td>${item.Descripcion}</td>
                        </tr>`
                }
                else if (item.Nombre.toUpperCase().indexOf(selector.toUpperCase()) > -1) {
                    res.innerHTML += `<tr class="selected" id="fila${cont}"  onclick="selectUser(this.id)">
                    <td>${item.Id_Solicitud}</td>  
                    <td>${item.DPI}</td>
                    <td>${item.Nombre}</td>
                    <td>${item.Fecha_Solicitud.slice(0, -9)}</td>
                    <td>${item.FechaI_Permiso.slice(0, -9)}</td>
                    <td>${item.FechaF_Permiso.slice(0, -9)}</td>
                    <td>${item.Descripcion}</td>
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
        var cod2 = fila.children[1].innerHTML;
        document.getElementById('sol').value = cod1;
        document.getElementById('dpi').value = cod2;
    }
}

var file;

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
            console.log(base64)
            file = base64;
        };
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
    }
}

function insertar() {
    var _DPI = $('#DPI').val();
    var data = {
        DPI: _DPI,
        Documento: file
    }
    if (navigator.onLine) {
        var db = firebase.database();
        if (db.ref('/Expedientes/' + _DPI).set(data)) {
            esperar();
            setTimeout(function () {
                Completado('REGISTRO AGREGADO EXITOSAMENTE');
            }, 4500);
        } else {
            Error('HA OCURRIDO UN ERROR')
        }
    } else {
        alert('No hay Conexión a Internet');
    }
}

function APROBAR() {

    if (keyrol == 'Administrativo') {
        APJ();
    } else if (keyrol == 'Gerente') {
        APG();
    } else if (keyrol == 'RRHH') {
        APRRHH();
    }
}


function APRRHH() {

    var _dpi = atob(localStorage.getItem("key2"));
    var _dpi2 = $('#dpi').val();

    $.post("http://localhost:63642/api/APRRHH", {
        DPIJ: _dpi,
        DPIC: _dpi2
    }, function (result) {
        if (result == 2) {
            esperar();
            setTimeout(function () {
                const xhtttp = new XMLHttpRequest();
                xhtttp.open('GET', 'http://localhost:63642/api/V_Users', true);
                xhtttp.send();
                xhtttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var datos = JSON.parse(this.responseText);
                        for (let item of datos) {
                            if (item.DPI == _dpi2) {
                                var mensaje = "SU SOLICITUD HA SIDO APROBADA POR RECURSOS HUMANOS";
                                console.log(datos)
                                console.log(item.Correo);
                                console.log(mensaje);
                                $.post("http://localhost:63642/api/Correo", {
                                    CorreoR: item.Correo,
                                    Mensaje: mensaje
                                }
                                )
                            }
                        }
                    }
                }
                Completado("SOLICITUD APROBADA CORRECTAMENTE");
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


function APG() {

    var _dpi = atob(localStorage.getItem("key2"));
    var _dpi2 = $('#dpi').val();

    $.post("http://localhost:63642/api/AP_G", {
        DPIJ: _dpi,
        DPIC: _dpi2
    }, function (result) {
        if (result == 2) {
            esperar();
            setTimeout(function () {
                const xhtttp = new XMLHttpRequest();
                xhtttp.open('GET', 'http://localhost:63642/api/V_Users', true);
                xhtttp.send();
                xhtttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var datos = JSON.parse(this.responseText);
                        for (let item of datos) {
                            if (item.DPI == _dpi2) {
                                var mensaje = "SU SOLICITUD HA SIDO TRANSFERIDA A RECURSOS HUMANOS";
                                console.log(datos)
                                console.log(item.Correo);
                                console.log(mensaje);
                                $.post("http://localhost:63642/api/Correo", {
                                    CorreoR: item.Correo,
                                    Mensaje: mensaje
                                }
                                )
                            }
                        }
                    }
                }
                Completado("SOLICITUD TRANSFERIDA A RECURSOS HUMANOS");
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


function APJ() {

    var _dpi = atob(localStorage.getItem("key2"));
    var _dpi2 = $('#dpi').val();

    $.post("http://localhost:63642/api/AP_JI", {
        DPIJ: _dpi,
        DPIC: _dpi2
    }, function (result) {
        if (result == 2) {
            esperar();
            setTimeout(function () {
                const xhtttp = new XMLHttpRequest();
                xhtttp.open('GET', 'http://localhost:63642/api/V_Users', true);
                xhtttp.send();
                xhtttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var datos = JSON.parse(this.responseText);
                        for (let item of datos) {
                            if (item.DPI == _dpi2) {
                                var mensaje = "SU SOLICITUD HA SIDO TRANSFERIDA AL GERENTE";
                                console.log(datos)
                                console.log(item.Correo);
                                console.log(mensaje);
                                $.post("http://localhost:63642/api/Correo", {
                                    CorreoR: item.Correo,
                                    Mensaje: mensaje
                                }
                                )
                            }
                        }
                    }
                }
                Completado("SOLICITUD TRANSFERIDA AL GERENTE");
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

function RECHAZAR() {
    var _obs = $('#obs').val();
    if (_obs != '') {
        if (keyrol == 'Administrativo') {
            RCHJ();
        } else if (keyrol == 'Gerente') {
            RCHG();
        } else if (keyrol == 'RRHH') {
            RCHRRHH();
        }
    } else {
        error('AGREGAR OBSERVACIÓN DEL POR QUÉ SE ESTÁ RECHAZANDO ESTA SOLICITUD')
    }
}


function RCHRRHH() {

    var _dpi = atob(localStorage.getItem("key2"));
    var _dpi2 = $('#dpi').val();
    var _obs = $('#obs').val();

    $.post("http://localhost:63642/api/RCH_SRRHH", {
        DPIJ: _dpi,
        DPIC: _dpi2,
        Observaciones: _obs
    }, function (result) {
        if (result == 2) {
            esperar();
            setTimeout(function () {
                const xhtttp = new XMLHttpRequest();
                xhtttp.open('GET', 'http://localhost:63642/api/V_Users', true);
                xhtttp.send();
                xhtttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var datos = JSON.parse(this.responseText);
                        for (let item of datos) {
                            if (item.DPI == _dpi2) {
                                var mensaje = '<h3>SU SOLICITUD HA SIDO RECHAZADA POR RECURSOS HUMANOS DEBIDO A:</h3> <br> <h2 style=\"color: red;\">' + _obs.toUpperCase() + '</h2> <br> <h3>INGRESE AL SISTEMA PARA REVISAR LA INFORMACIÓN</h3>';
                                console.log(datos)
                                console.log(item.Correo);
                                console.log(mensaje);
                                $.post("http://localhost:63642/api/Correo", {
                                    CorreoR: item.Correo,
                                    Mensaje: mensaje
                                }
                                )
                            }
                        }
                    }
                }
                Completado("SOLICITUD RECHAZADA CORRECTAMENTE");
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


function RCHG() {

    var _dpi = atob(localStorage.getItem("key2"));
    var _dpi2 = $('#dpi').val();
    var _obs = $('#obs').val();

    $.post("http://localhost:63642/api/RCH_SG", {
        DPIJ: _dpi,
        DPIC: _dpi2,
        Observaciones: _obs
    }, function (result) {
        if (result == 2) {
            esperar();
            setTimeout(function () {
                const xhtttp = new XMLHttpRequest();
                xhtttp.open('GET', 'http://localhost:63642/api/V_Users', true);
                xhtttp.send();
                xhtttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var datos = JSON.parse(this.responseText);
                        for (let item of datos) {
                            if (item.DPI == _dpi2) {
                                var mensaje = '<h3>SU SOLICITUD HA SIDO RECHAZADA POR EL GERENTE DEBIDO A:</h3> <br> <h2 style=\"color: red;\">' + _obs.toUpperCase() + '</h2> <br> <h3>INGRESE AL SISTEMA PARA REVISAR LA INFORMACIÓN</h3>';
                                console.log(datos)
                                console.log(item.Correo);
                                console.log(mensaje);
                                $.post("http://localhost:63642/api/Correo", {
                                    CorreoR: item.Correo,
                                    Mensaje: mensaje
                                }
                                )
                            }
                        }
                    }
                }
                Completado("SOLICITUD RECHAZADA CORRECTAMENTE");
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


function RCHJ() {

    var _dpi = atob(localStorage.getItem("key2"));
    var _dpi2 = $('#dpi').val();
    var _obs = $('#obs').val();

    $.post("http://localhost:63642/api/RCH_SJ", {
        DPIJ: _dpi,
        DPIC: _dpi2,
        Observaciones: _obs
    }, function (result) {
        if (result == 2) {
            esperar();
            setTimeout(function () {
                const xhtttp = new XMLHttpRequest();
                xhtttp.open('GET', 'http://localhost:63642/api/V_Users', true);
                xhtttp.send();
                xhtttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var datos = JSON.parse(this.responseText);
                        for (let item of datos) {
                            if (item.DPI == _dpi2) {
                                var mensaje = '<h3>SU SOLICITUD HA SIDO RECHAZADA POR SU JEFE INMEDIATO DEBIDO A:</h3> <br> <h2 style=\"color: red;\">' + _obs.toUpperCase() + '</h2> <br> <h3>INGRESE AL SISTEMA PARA REVISAR LA INFORMACIÓN</h3>';
                                console.log(datos)
                                console.log(item.Correo);
                                console.log(mensaje);
                                $.post("http://localhost:63642/api/Correo", {
                                    CorreoR: item.Correo,
                                    Mensaje: mensaje
                                }
                                )
                            }
                        }
                    }
                }
                Completado("SOLICITUD RECHAZADA CORRECTAMENTE");
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