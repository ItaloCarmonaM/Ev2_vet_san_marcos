import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";
import SelectorFechaHora from "../molecules/SelectorFechaHora";
import Casilla from "../atoms/Casilla";
import Boton from "../atoms/Boton";
import { campoObligatorio } from "../../utils/validaciones";
import { errorDeFecha, errorDeHora } from "../../utils/validacionesCita";

const VALORES_INICIALES = {
  motivo: "",
  diagnostico: "",
  medicamentos: "",
  control: false,
  fecha: "",
  hora: "",
};

function FormularioAtencion(props) {
  const [datos, setDatos] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});

  function manejarCambio(e) {
    const { name, value } = e.target;
    setDatos((anterior) => ({ ...anterior, [name]: value }));
    setErrores((anterior) => ({ ...anterior, [name]: "" }));
  }

  function manejarControl(e) {
    const marcado = e.target.checked;
    setDatos((anterior) => ({ ...anterior, control: marcado }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errorFecha = !datos.control ? "" : !datos.fecha ? "Selecciona una fecha" : errorDeFecha(datos.fecha);
    const errorHora =
      !datos.control || errorFecha
        ? ""
        : !datos.hora
        ? "Selecciona una hora"
        : errorDeHora(datos.fecha, datos.hora, props.ocupadas);

    const nuevos = {
      motivo: campoObligatorio(datos.motivo, "El motivo"),
      diagnostico: campoObligatorio(datos.diagnostico, "El diagnóstico"),
      fecha: errorFecha,
      hora: errorHora,
    };
    setErrores(nuevos);

    const hayErrores = Object.values(nuevos).some((mensaje) => mensaje !== "");
    if (hayErrores || !props.onGuardar) return;

    props.onGuardar({
      motivo: datos.motivo.trim(),
      diagnostico: datos.diagnostico.trim(),
      medicamentos: datos.medicamentos.trim(),
      control: datos.control ? { fecha: datos.fecha, hora: datos.hora } : null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4" noValidate>
      <CampoFormulario id="motivo" name="motivo" etiqueta="Motivo de la consulta"
        placeholder="Ej: Vómitos, chequeo general, vacunación..." valor={datos.motivo}
        onChange={manejarCambio} error={errores.motivo} />
      <CampoFormulario id="diagnostico" name="diagnostico" etiqueta="Diagnóstico" tipo="textarea"
        filas={4} placeholder="Escribe el diagnóstico del paciente" valor={datos.diagnostico}
        onChange={manejarCambio} error={errores.diagnostico} />
      <CampoFormulario id="medicamentos" name="medicamentos" etiqueta="Medicamentos recetados" tipo="textarea"
        placeholder="Ej: Amoxicilina 250mg cada 12 hrs por 7 días" valor={datos.medicamentos}
        onChange={manejarCambio} />

      <div className="mb-3">
        <Casilla id="control" name="control" etiqueta="Agendar control de seguimiento"
          marcada={datos.control} onChange={manejarControl} />
      </div>

      {datos.control && (
        <SelectorFechaHora
          id="control"
          fecha={datos.fecha}
          hora={datos.hora}
          onChangeFecha={manejarCambio}
          onChangeHora={manejarCambio}
          ocupadas={props.ocupadas}
          errorFecha={errores.fecha}
          errorHora={errores.hora}
        />
      )}

      <Boton tipo="submit" texto="Guardar atención" variante="primary" className="btn-lg" />
    </form>
  );
}

export default FormularioAtencion;