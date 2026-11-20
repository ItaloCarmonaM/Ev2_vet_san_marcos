export function obtenerMensajeError(error) {
  if (error.response) {
    const datos = error.response.data;
    const texto = datos && (datos.mensaje || datos.error);
    if (typeof texto === "string") {
      const detalles = Array.isArray(datos.detalles) ? datos.detalles.join(" ") : "";
      return texto + (detalles ? " " + detalles : "");
    }
    return "La API respondió con un error (" + error.response.status + ").";
  }
  if (error.code === "ECONNABORTED") {
    return "La API tardó demasiado. Intenta de nuevo.";
  }
  return "No fue posible contactar la API. Revisa la conexión.";
}