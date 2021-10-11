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

function BUSCAR() {
    const xhtttp = new XMLHttpRequest();
    xhtttp.open('GET', 'http://localhost:63642/api/V_Empleados', true);
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
                        <td>${item.DPI}</td>
                        <td>${item.Nombre}</td>
                        </tr>`
                }
                else if (item.Nombre.toUpperCase().indexOf(selector.toUpperCase()) > -1) {
                    res.innerHTML += `<tr class="selected" id="fila${cont}"  onclick="selectUser(this.id)">
                        <td>${item.DPI}</td>
                        <td>${item.Nombre}</td>
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
        document.getElementById('DPI').value = cod1;

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

function modificar() {
    var _DPI = $('#DPI').val();

    var data = {
        DPI: _DPI,
        Documento: file
    }
    if (navigator.onLine) {
        var db = firebase.database();
        if (db.ref('/Expedientes/' + _DPI).update(data)) {
            setTimeout(function () {
                Completado('EXPEDIENTE MODIFICADO');
            }, 500);
        }
    } else {
        alert('No hay Conexión a Internet');
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