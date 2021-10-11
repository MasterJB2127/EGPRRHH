$(document).ready(function permiso(){
    var rol = atob(localStorage.getItem("key1"));
    if(rol == "Gerente" || rol == "Administrativo" || rol== "Operativo" || rol == "RRHH"){
    }else{
    alert("Debe iniciar Sesión");
    setTimeout("location.href='../index.html'",1000);
    }
});