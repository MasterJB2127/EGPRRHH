$(document).ready(function permiso(){
    var rol = atob(localStorage.getItem("key1"));
    console.log(rol);
    if(rol == "Operativo" || rol == "Gerente" || rol == "Administrativo"){
    setTimeout("location.href='../Views/Home.html'");
    }else if(rol == "RRHH"){

    }else if(rol == ''){
    alert("Debe iniciar Sesión");
    setTimeout("location.href='../index.html'",1000);
    }
});