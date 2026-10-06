import { diaDeLaSemana, fechaHoy, horasDelDia } from "./horario";

// Devuelve el texto del error de la fecha, o "" si está bien.
export function errorDeFecha(fecha) {
  if (!fecha) return "";
  if (fecha < fechaHoy()) return "La fecha no puede ser anterior a hoy";
  if (diaDeLaSemana(fecha) === 0) return "No atendemos los domingos";
  return "";
}

// Error de la hora (no existe ese día, ya pasó, o está ocupada)
export function errorDeHora(fecha, hora, ocupadas) {
  if (!hora) return "";
  const opcion = horasDelDia(fecha, ocupadas).find((h) => h.valor === hora);
  if (!opcion) return "La hora no está disponible para ese día";
  if (opcion.deshabilitada) return "Esa hora ya está ocupada, elige otra";
  return "";
}

// Valida todo junto. Devuelve el mensaje de error, o "" si está todo bien.
export function validarFechaHora(fecha, hora, ocupadas) {
  if (!fecha) return "Selecciona una fecha";
  if (errorDeFecha(fecha)) return errorDeFecha(fecha);
  if (!hora) return "Selecciona una hora";
  return errorDeHora(fecha, hora, ocupadas);
}