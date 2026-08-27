// =========================================================
// CONFIGURACIÓN
// =========================================================

const API_URL =
  "https://kit-asesoria-backend.vhtza8.easypanel.host";


// =========================================================
// SESIÓN
// =========================================================

function obtenerToken() {

  return localStorage.getItem("token");

}


function obtenerUsuario() {

  const usuarioGuardado =
    localStorage.getItem("usuario");

  if (!usuarioGuardado) {
    return null;
  }

  try {

    return JSON.parse(
      usuarioGuardado
    );

  } catch (error) {

    console.error(
      "Error leyendo usuario:",
      error
    );

    return null;
  }
}


// =========================================================
// COMPROBAR SESIÓN
// =========================================================

function comprobarSesion() {

  const token =
    obtenerToken();

  const usuario =
    obtenerUsuario();


  if (!token || !usuario) {

    window.location.href =
      "login.html";

    return false;
  }


  return true;
}


// =========================================================
// COMPROBAR ROL INTERNO
// =========================================================

function comprobarAccesoInterno() {

  const usuario =
    obtenerUsuario();


  if (!usuario) {

    window.location.href =
      "login.html";

    return false;
  }


  const rolesPermitidos = [
    "SUPERADMIN",
    "ADMIN",
    "DIRECTOR",
    "TRABAJADOR"
  ];


  if (
    !rolesPermitidos.includes(
      usuario.rol
    )
  ) {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    window.location.href =
      "login.html";

    return false;
  }


  return true;
}


// =========================================================
// CERRAR SESIÓN
// =========================================================

function cerrarSesion() {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "usuario"
  );


  window.location.href =
    "login.html";
}


// =========================================================
// PETICIÓN AUTENTICADA
// =========================================================

async function peticionAPI(
  endpoint,
  opciones = {}
) {

  const token =
    obtenerToken();


  const headers = {
    ...(opciones.headers || {}),
    "Authorization":
      `Bearer ${token}`
  };


  return fetch(
    `${API_URL}${endpoint}`,
    {
      ...opciones,
      headers
    }
  );
}


// =========================================================
// FORMATEAR FECHA
// =========================================================

function formatearFecha(
  fecha
) {

  if (!fecha) {
    return "-";
  }


  const fechaObjeto =
    new Date(fecha);


  if (
    Number.isNaN(
      fechaObjeto.getTime()
    )
  ) {

    return "-";
  }


  return fechaObjeto.toLocaleString(
    "es-ES",
    {
      dateStyle: "short",
      timeStyle: "short"
    }
  );
}
