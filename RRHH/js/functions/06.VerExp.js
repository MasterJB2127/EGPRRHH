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
    let res = document.querySelector('#datos');
    res.innerHTML = "<iframe width='100%' height='600px' src='" + url + "'></iframe>";
}

var dataPDF;
$(document).ready(function Exped(){
    var _dpi = atob(localStorage.getItem("key2"));

    const menu = firebase.database().ref("Expedientes/");
    menu.on("value", function (snapshot) {
        $("#datos").empty();

        snapshot.forEach(function (childsnapshot) {
            var data = childsnapshot.val();
            if (_dpi == data.DPI) {
                dataPDF = data.Documento;
                downloadPDF();
            }
        }
        );
    })
});

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