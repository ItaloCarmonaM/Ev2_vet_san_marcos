import { diaDeLaSemana, horasDelDia } from "./horario";

// Convierte "YYYY-MM-DD" en fecha local (evita el desfase de zona horaria)
function parsearFecha(texto) {
  const [anio, mes, dia] = texto.split("-").map(Number);
  const fecha = new Date(anio, mes - 1, dia);
  const valida =
    fecha.getFullYear() === anio &&
    fecha.getMonth() === mes - 1 &&
    fecha.getDate() === dia;
  return valida ? fecha : null;
}

export function errorDeFecha(fecha) {
  if (!fecha) return "";

  const elegida = parsearFecha(fecha);
  if (!elegida) return "Ingresa una fecha válida.";

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  if (elegida < hoy) return "La fecha no puede ser anterior a hoy.";

  if (diaDeLaSemana(fecha) === 0) return "No atendemos los domingos.";
  return "";
}

export function errorDeHora(fecha, hora, ocupadas) {
  if (!hora) return "";
  if (!fecha || errorDeFecha(fecha)) return "";

  const opcion = horasDelDia(fecha, ocupadas).find((h) => h.valor === hora);
  if (!opcion) return "Elige una hora válida.";
  if (opcion.deshabilitada) return "Esa hora ya no está disponible.";

  return "";
}