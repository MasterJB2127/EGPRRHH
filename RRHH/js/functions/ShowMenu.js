$(document).ready(function Show() {
  var rol = atob(localStorage.getItem("key1"));
  let res = document.querySelector('#side-menu');
  if (rol == "Gerente") {
    res.innerHTML += `<a style="font-size:medium;" href="./Home.html">Inicio</a>
    <a style="font-size:medium;" href="./Target.html">Visualizar Tarjeta</a>
    <a style="font-size:medium;" href="./OfficeReg.html">Registrar Oficina</a>
    <a style="font-size:medium;" href="./UserReg.html">Regitrar Usuario</a>
    <button style="margin-top: 10%;" class="btn btn-link" onclick="logout()">
    <h5 style="color: black;">CERRAR SESION</h5>
    </button>`
  } else if (rol == "User") {
    res.innerHTML += `<a style="font-size:medium;" href="./Home.html">Inicio</a>
        <a style="font-size:medium;" href="./Target.html">Visualizar Tarjeta</a>
        <a style="font-size:medium;" href="./Change.html">Cambiar Contraseña</a>
        <button style="margin-top: 40%;" class="btn btn-link" onclick="logout()">
        <h5 style="color: red;">CERRAR SESION</h5>
      </button>`
  } else if (rol == "Concejo") {
    res.innerHTML += `<a style="font-size:medium;" href="./Home.html">Inicio</a>
        <a style="font-size:medium;" href="./FindTarget.html">Buscar Tarjeta</a>
        <a style="font-size:medium;" href="./AB.html">Activos Dados de Baja</a>
        <a style="font-size:medium;" href="./InacTar.html">Tarjetas Dadas de Baja</a>
        <a style="font-size:medium;" href="./BIT.html">Historial</a>
        <a style="font-size:medium;" href="./Change.html">Cambiar Contraseña</a>
        <button style="margin-top: 40%;" class="btn btn-link" onclick="logout()">
        <h5 style="color: red;">CERRAR SESION</h5>
        </button>`
  }
});
