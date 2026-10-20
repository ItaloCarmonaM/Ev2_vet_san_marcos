// 15000 -> "15.000" (formato chileno). Si no hay precio devuelve "".
export function formatearPrecio(precio) {
  if (precio === undefined || precio === null || precio === "") return "";
  return Number(precio).toLocaleString("es-CL");
}

// "Perro / Gato" -> ["Perro", "Gato"]
export function separarEspecies(especie) {
  if (!especie) return [];
  return especie.split("/").map((e) => e.trim());
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
  const [anio, mes, dia] = fecha.split("-");
  return `${dia}-${mes}-${anio}`;
}

export function nombreDeServicio(cita) {
  return typeof cita.servicio === "object" ? cita.servicio.nombre : cita.servicio;
}