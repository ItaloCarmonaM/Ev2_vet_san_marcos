import CampoFormulario from "./CampoFormulario";
import { horasDelDia } from "../../utils/horario";
import { errorDeFecha, errorDeHora } from "../../utils/validacionesCita";

function SelectorFechaHora(props) {
  const id = props.id || "cita";
  const errorFecha = props.errorFecha || errorDeFecha(props.fecha);
  const horas = errorFecha ? [] : horasDelDia(props.fecha, props.ocupadas);
  const sinDisponibles = horas.every((h) => h.deshabilitada);

  // Si la hora elegida deja de estar disponible al cambiar la fecha, se limpia sola
  function manejarFecha(e) {
    props.onChangeFecha(e);
    const nuevas = horasDelDia(e.target.value, props.ocupadas);
    if (props.hora && !nuevas.some((h) => h.valor === props.hora && !h.deshabilitada)) {
      props.onChangeHora({ target: { name: "hora", value: "" } });
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
          opciones={horas}
          placeholder={
            !props.fecha || errorFecha
              ? "Primero elige una fecha válida"
              : sinDisponibles
              ? "No hay horas disponibles este día"
              : "Selecciona una hora"
          }
          valor={props.hora}
          onChange={props.onChangeHora}
          requerido={props.requerido}
          error={props.errorHora || errorDeHora(props.fecha, props.hora, props.ocupadas)}
        />
      </div>
    </div>
  );
}

export default SelectorFechaHora;