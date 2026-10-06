import { esFueraDeHorario } from "./horario";

// Recargo por atender fuera del horario normal (según Observaciones del catálogo)
export const RECARGO_FUERA_DE_HORARIO = 10000;

// Servicios que cobran recargo fuera de horario (por ahora solo la consulta de urgencia)
const SERVICIOS_CON_RECARGO = ["SV002"];

// true si el servicio cobra recargo fuera de horario
export function tieneRecargoFueraDeHorario(servicio) {
  return SERVICIOS_CON_RECARGO.includes(servicio.codigo);
}

// Precio final de un servicio. Si se atiende fuera de horario (por defecto, ahora mismo)
// y el servicio tiene recargo, suma $10.000 al precio base.
// Ej: SV002 -> 25000 + 10000 = 35000
export function calcularPrecioServicio(servicio, fecha = new Date()) {
  const base = Number(servicio.precio);
  if (tieneRecargoFueraDeHorario(servicio) && esFueraDeHorario(fecha)) {
    return base + RECARGO_FUERA_DE_HORARIO;
  }
  return base;
}