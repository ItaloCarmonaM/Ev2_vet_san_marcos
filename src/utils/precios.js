import { esFueraDeHorario } from "./horario";

export const RECARGO_FUERA_DE_HORARIO = 10000;
const SERVICIOS_CON_RECARGO = ["SV002"];

export function tieneRecargoFueraDeHorario(servicio) {
  if (!servicio) return false;
  return SERVICIOS_CON_RECARGO.includes(servicio.codigo);
}

export function calcularPrecioServicio(servicio, fecha = new Date()) {
  if (!servicio) return 0;
  const base = Number(servicio.precio) || 0;
  if (tieneRecargoFueraDeHorario(servicio) && esFueraDeHorario(fecha)) {
    return base + RECARGO_FUERA_DE_HORARIO;
  }
  return base;
}
