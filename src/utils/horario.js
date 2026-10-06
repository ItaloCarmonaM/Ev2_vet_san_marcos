// Horario de atención (fuente única, la usan SelectorFechaHora y precios).
// Lunes a viernes 9-19, sábado 9-14, domingo cerrado. Clave = Date.getDay() (0 = domingo).
export const HORARIO_ATENCION = {
  0: null,
  1: { apertura: 9, cierre: 19 },
  2: { apertura: 9, cierre: 19 },
  3: { apertura: 9, cierre: 19 },
  4: { apertura: 9, cierre: 19 },
  5: { apertura: 9, cierre: 19 },
  6: { apertura: 9, cierre: 14 },
};

const MINUTOS_DEL_BLOQUE = ["00", "30"]; // bloques cada 30 minutos

function dosDigitos(n) {
  return String(n).padStart(2, "0");
}

// Fecha de hoy como "AAAA-MM-DD" (mismo formato que el input date)
export function fechaHoy() {
  const d = new Date();
  return `${d.getFullYear()}-${dosDigitos(d.getMonth() + 1)}-${dosDigitos(d.getDate())}`;
}

// "2026-10-05" -> número de día de la semana (0 = domingo)
export function diaDeLaSemana(fecha) {
  return new Date(fecha + "T00:00:00").getDay();
}

// true si la fecha/hora cae fuera del horario de atención
export function esFueraDeHorario(fecha = new Date()) {
  const horario = HORARIO_ATENCION[fecha.getDay()];
  if (!horario) return true; // domingo
  const hora = fecha.getHours();
  return hora < horario.apertura || hora >= horario.cierre;
}

// ¿hay una cita en esa fecha y hora? Acepta horas como "09:30" o "09:30:00"
export function estaOcupada(ocupadas, fecha, hora) {
  return (ocupadas || []).some(
    (c) => c.fecha === fecha && String(c.hora).slice(0, 5) === hora
  );
}

// Bloques de hora disponibles para una fecha: [{ valor, texto, deshabilitada }]
// Si la fecha es inválida (vacía o domingo) devuelve []. Si es hoy, quita las horas que ya pasaron.
export function horasDelDia(fecha, ocupadas) {
  if (!fecha) return [];
  const horario = HORARIO_ATENCION[diaDeLaSemana(fecha)];
  if (!horario || fecha < fechaHoy()) return [];

  const horas = [];
  for (let h = horario.apertura; h < horario.cierre; h++) {
    for (const min of MINUTOS_DEL_BLOQUE) {
      const valor = `${dosDigitos(h)}:${min}`;
      const ocupada = estaOcupada(ocupadas, fecha, valor);
      horas.push({
        valor,
        texto: ocupada ? `${valor} (ocupada)` : valor,
        deshabilitada: ocupada,
      });
    }
  }

  if (fecha === fechaHoy()) {
    const ahora = new Date();
    const actual = `${dosDigitos(ahora.getHours())}:${dosDigitos(ahora.getMinutes())}`;
    return horas.filter((h) => h.valor > actual);
  }
  return horas;
}