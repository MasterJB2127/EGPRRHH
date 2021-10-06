$(document).ready(function permiso(){
    var rol = atob(localStorage.getItem("key1"));
    if(rol == "User"){
    setTimeout("location.href='./Views/Home1.html'");
    alert("No tiene permisos suficientes para acceder");
    }else if(rol == "Admin"){
    }else{
    alert("Debe iniciar Sesión");
    setTimeout("location.href='../index.html'");
    }
});