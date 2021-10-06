function login(){
    var _correo = $('#email').val();
    var _password = $('#pass').val();

    //debugger
        $.post("http://localhost:63642/api/Login", {
        email: _correo,
        password: _password
        },
         function(result){
            var exception = result.InnerException.Errors[0].state;
            var j = result.InnerException.Errors[0].message;
            var j1 = JSON.parse(j);
            var rol = btoa(j1.rol);
            var dpi = btoa(j1.dpi);
            var name = btoa(j1.nombre);
            var mensaje = j1.message;
            console.log(j1);
            

            if(exception != 1){
                error(mensaje);                  
                  setTimeout(function(){
                    setTimeout("location.href='./index.html'", 200);
                     },2000)
            }
            else{
                setTimeout("location.href='./Views/Home.html'", 200);
                localStorage.setItem("key1", rol)
                localStorage.setItem("key2", dpi)
                localStorage.setItem("key3", name);
            }
        }
    )
}

function logout(){
    
    setTimeout("location.href='../index.html'", 1000);
    localStorage.removeItem('key1');
    localStorage.removeItem('key2');
    localStorage.removeItem('key3')
}

function error(E){
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