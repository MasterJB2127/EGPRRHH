$(document).ready(function permiso(){
    var rol = atob(localStorage.getItem("key1"));
    if(rol == "Operativo"){
    setTimeout("location.href='../Views/Home.html'");
    error("No tiene permisos suficientes para acceder");
    }else if(rol == "Gerente" || rol == "Administrativo"){
    }else if(rol == "RRHH"){}
    else{
    alert("Debe iniciar Sesión");
    setTimeout("location.href='../index.html'",1000);
    }
});