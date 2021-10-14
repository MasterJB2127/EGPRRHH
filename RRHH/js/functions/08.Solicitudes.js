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
    var _dpi = atob(localStorage.getItem("key2"));
    const xhtttp = new XMLHttpRequest();
    xhtttp.open('GET', 'http://localhost:63642/api/V_Solicitudes', true);
    xhtttp.send();
    xhtttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText);
            let res = document.querySelector('#datos');
            res.innerHTML = '';
            var cont = 0;
            for (let item of datos) {
                cont++;
                if (item.DPI == _dpi) {
                    res.innerHTML += `<tr style="font-size: small;" class="selected" id="fila${cont}"  onclick="selectUser(this.id)">
                    <td>${item.Id_Solicitud}</td>    
                    <td>${item.DPI}</td>
                    <td>${item.Fecha_Solicitud.slice(0, -9)}</td>
                    <td>${item.Estado}</td>
                    <td>${item.Descripcion}</td>
                        </tr>`
                }
            }
        }
    }
}

var dataPDF;

function Exp(){
    var _sol = $('#sol').val();
if(_sol!=''){
    const menu = firebase.database().ref("Solicitudes/");
        menu.on("value", function (snapshot) {
            $("#datos").empty();
    
            snapshot.forEach(function (childsnapshot) {
                var data = childsnapshot.val();
                if (_sol == data.id) {
                    dataPDF = data.Documento;
                    downloadPDF();
                    BUSCAR();
                }
            }
            );
        })
}else{
    error('NO TIENE NINGUNA SOLICITUD SELECCIONADA')
}
}

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

function selectUser(id_fila) {
    if (event.target.tagName == "TD") {
        var fila = event.target.parentNode;
        var cod1 = fila.children[0].innerHTML;
        document.getElementById('sol').value = cod1;

    }
}


$(document).ready(function Exped(){
    BUSCAR();
});