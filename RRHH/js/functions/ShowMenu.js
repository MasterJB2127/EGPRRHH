$(document).ready(function Show() {
  var rol = atob(localStorage.getItem("key1"));
  let res = document.querySelector('#side-menu');
  if (rol == "RRHH") {
    res.innerHTML += `<a style="font-size:medium;" href="./Home.html">Inicio</a>
    <a style="font-size:medium;" href="./UserReg.html">Registrar Usuario</a>
    <a style="font-size:medium;" href="./Expedientes_Carga.html">Cargar Expedientes</a>
    <a style="font-size:medium;" href="./AprobSol.html">Gestión de Solicitudes</a>
    <a style="font-size:medium;" href="./Expediente.html">Visualizar mi Expediente</a>
    <a style="font-size:medium;" href="./Solicitud.html">Realizar Solicitudes</a>
    <a style="font-size:medium;" href="./BIT.html">Visualizar Historial</a>
    <a style="font-size:medium;" href="./Constraseña.html">Cambiar Contraseña</a>
    <button style="margin-top: 10%;" class="btn btn-link" onclick="logout()">
    <h5 style="color: black;">CERRAR SESION</h5>
    </button>`
  } else if (rol == "Gerente") {
    res.innerHTML += `<a style="font-size:medium;" href="./Home.html">Inicio</a>
    <a style="font-size:medium;" href="./AprobSol.html">Gestión de Solicitudes</a>
    <a style="font-size:medium;" href="./Expediente.html">Visualizar mi Expediente</a>
    <a style="font-size:medium;" href="./Solicitud.html">Realizar Solicitudes</a>
    <a style="font-size:medium;" href="./Constraseña.html">Cambiar Contraseña</a>
        <button style="margin-top: 40%;" class="btn btn-link" onclick="logout()">
        <h5 style="color: red;">CERRAR SESION</h5>
      </button>`
  } else if (rol == "Administrativo") {
    res.innerHTML += `<a style="font-size:medium;" href="./Home.html">Inicio</a>
    <a style="font-size:medium;" href="./AprobSol.html">Gestión de Solicitudes</a>
    <a style="font-size:medium;" href="./Expediente.html">Visualizar mi Expediente</a>
    <a style="font-size:medium;" href="./Solicitud.html">Realizar Solicitudes</a>
    <a style="font-size:medium;" href="./Constraseña.html">Cambiar Contraseña</a>
        <button style="margin-top: 40%;" class="btn btn-link" onclick="logout()">
        <h5 style="color: red;">CERRAR SESION</h5>
        </button>`
  }else if (rol == "Operativo") {
    res.innerHTML += `<a style="font-size:medium;" href="./Home.html">Inicio</a>
    <a style="font-size:medium;" href="./Expediente.html">Visualizar mi Expediente</a>
    <a style="font-size:medium;" href="./Solicitud.html">Realizar Solicitudes</a>
    <a style="font-size:medium;" href="./Constraseña.html">Cambiar Contraseña</a>
        <button style="margin-top: 40%;" class="btn btn-link" onclick="logout()">
        <h5 style="color: red;">CERRAR SESION</h5>
        </button>`
  }
});
