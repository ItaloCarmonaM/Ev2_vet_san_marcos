import CampoFormulario from "./CampoFormulario";

// Horario tomado del proyecto antiguo: lunes a viernes 9-19, sábado 9-14, domingo cerrado.
// Los bloques son cada 30 minutos (si quieres cada hora, deja solo ["00"]).
function hoy() {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

// Devuelve el texto del error de la fecha, o "" si está bien.
export function errorDeFecha(fecha) {
  if (!fecha) return "";
  if (fecha < hoy()) return "La fecha no puede ser anterior a hoy";
  if (new Date(fecha + "T00:00:00").getDay() === 0) return "No atendemos los domingos";
  return "";
}

// NUEVO: ¿hay una cita en esa fecha y hora? Acepta horas como "09:30" o "09:30:00"
function estaOcupada(ocupadas, fecha, hora) {
  return (ocupadas || []).some(
    (c) => c.fecha === fecha && String(c.hora).slice(0, 5) === hora
  );
}

function horasDelDia(fecha, ocupadas) {
  if (!fecha || errorDeFecha(fecha)) return [];
  const diaSemana = new Date(fecha + "T00:00:00").getDay();
  const cierre = diaSemana === 6 ? 14 : 19;
  const horas = [];
  for (let h = 9; h < cierre; h++) {
    for (const min of ["00", "30"]) {
      const valor = `${String(h).padStart(2, "0")}:${min}`;
      const ocupada = estaOcupada(ocupadas, fecha, valor); // NUEVO
      horas.push({
        valor,
        texto: ocupada ? `${valor} (ocupada)` : valor, // NUEVO
        deshabilitada: ocupada, // NUEVO
      });
    }
  }
  // Si es hoy, quita las horas que ya pasaron
  if (fecha === hoy()) {
    const ahora = new Date();
    const actual = `${String(ahora.getHours()).padStart(2, "0")}:${String(ahora.getMinutes()).padStart(2, "0")}`;
    return horas.filter((h) => h.valor > actual);
  }
  return horas;
}

// Error de la hora (no existe ese día, ya pasó, o está ocupada)
export function errorDeHora(fecha, hora, ocupadas) {
  if (!hora) return "";
  const opcion = horasDelDia(fecha, ocupadas).find((h) => h.valor === hora);
  if (!opcion) return "La hora no está disponible para ese día";
  if (opcion.deshabilitada) return "Esa hora ya está ocupada, elige otra"; // NUEVO
  return "";
}

// Valida todo junto. Devuelve el mensaje de error, o "" si está todo bien.
export function validarFechaHora(fecha, hora, ocupadas) {
  if (!fecha) return "Selecciona una fecha";
  if (errorDeFecha(fecha)) return errorDeFecha(fecha);
  if (!hora) return "Selecciona una hora";
  return errorDeHora(fecha, hora, ocupadas);
}

function SelectorFechaHora(props) {
  const id = props.id || "cita";
  const errorFecha = props.errorFecha || errorDeFecha(props.fecha);
  const horas = errorFecha ? [] : horasDelDia(props.fecha, props.ocupadas); // NUEVO: ocupadas
  const sinDisponibles = horas.every((h) => h.deshabilitada); // NUEVO

  // Al cambiar la fecha, si la hora elegida ya no está disponible ese día, se limpia sola
  function manejarFecha(e) {
    props.onChangeFecha(e);
    const nuevas = horasDelDia(e.target.value, props.ocupadas);
    if (props.hora && !nuevas.some((h) => h.valor === props.hora && !h.deshabilitada)) {
      props.onChangeHora({ target: { value: "" } });
    }
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <CampoFormulario
          id={`${id}-fecha`}
          name="fecha"
          etiqueta="Fecha"
          tipo="date"
          valor={props.fecha}
          onChange={manejarFecha}
          requerido={props.requerido}
          error={errorFecha}
        />
      </div>
      <div className="col-md-6">
        <CampoFormulario
          id={`${id}-hora`}
          name="hora"
          etiqueta="Hora"
          tipo="select"
          opciones={horas}
          placeholder={
            !props.fecha || errorFecha
              ? "Primero elige una fecha válida"
              : sinDisponibles
              ? "No hay horas disponibles este día" // NUEVO
              : "Selecciona una hora"
          }
          valor={props.hora}
          onChange={props.onChangeHora}
          requerido={props.requerido}
          error={props.errorHora || errorDeHora(props.fecha, props.hora, props.ocupadas)} // NUEVO
        />
      </div>
    </div>
  );
}

export default SelectorFechaHora;