$(document).ready(function permiso(){
    var rol = atob(localStorage.getItem("key1"));
    if(rol != "Admin" && rol != "User"){
        alert("Debe iniciar Sesión");
        setTimeout("location.href='../index.html'");
    }
});