// 15000 -> "15.000" (formato chileno). Si no hay precio devuelve "".
export function formatearPrecio(precio) {
  if (precio === undefined || precio === null || precio === "") return "";
  return Number(precio).toLocaleString("es-CL");
}

// "Perro / Gato" -> ["Perro", "Gato"]
export function separarEspecies(especie) {
  if (!especie) return [];
  return String(especie).split("/").map((e) => e.trim());
}

// Minúsculas y sin tildes, para comparar textos al buscar
export function normalizarTexto(texto) {
  return String(texto)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function formatearFecha(fecha) {
  if (!fecha) return "";
  const [anio, mes, dia] = String(fecha).split("-");
  return `${dia}-${mes}-${anio}`;
}

export function nombreDeServicio(cita) {
  if (!cita) return "";
  if (cita.servicio && typeof cita.servicio === "object") {
    return cita.servicio.nombre || "";
  }
  return cita.servicio || cita.servicio_nombre || cita.servicio_codigo || "";
}

export function nombreDeMascota(cita) {
  if (!cita) return "";
  if (cita.mascota && typeof cita.mascota === "object") {
    return cita.mascota.nombre || "";
  }
  return cita.mascota || cita.mascota_nombre || "";
}

export function especieDeCita(cita) {
  if (!cita) return "";
  if (cita.especie) return cita.especie;
  if (cita.mascota && typeof cita.mascota === "object") {
    return cita.mascota.especie || "";
  }
  return "";
}
