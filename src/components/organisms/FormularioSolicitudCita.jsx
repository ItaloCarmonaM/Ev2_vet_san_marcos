import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";
import SelectorFechaHora from "../molecules/SelectorFechaHora";
import Boton from "../atoms/Boton";
import { campoObligatorio } from "../../utils/validaciones";
import { errorDeFecha, errorDeHora } from "../../utils/validacionesCita";
import { formatearPrecio } from "../../utils/formato";

const ESPECIES = ["Perro", "Gato", "Conejo", "Ave"].map((e) => ({ valor: e, texto: e }));

function FormularioSolicitudCita(props) {
  const servicios = props.servicios || [];
  const [datos, setDatos] = useState({
    mascota: "",
    especie: "",
    servicio: props.servicioInicial || "",
    fecha: "",
    hora: "",
  });
  const [errores, setErrores] = useState({});

  const opcionesServicio = servicios.map((s) => ({
    valor: s.codigo,
    texto: `${s.nombre} ($${formatearPrecio(s.precio)})`,
  }));

  function manejarCambio(e) {
    const { name, value } = e.target;
    setDatos((anterior) => ({ ...anterior, [name]: value }));
    setErrores((anterior) => ({ ...anterior, [name]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errorFecha = !datos.fecha ? "Selecciona una fecha" : errorDeFecha(datos.fecha);
    const errorHora = errorFecha
      ? ""
      : !datos.hora
      ? "Selecciona una hora"
      : errorDeHora(datos.fecha, datos.hora, props.ocupadas);

    const nuevos = {
      mascota: campoObligatorio(datos.mascota, "El nombre de la mascota"),
      especie: campoObligatorio(datos.especie, "La especie"),
      servicio: campoObligatorio(datos.servicio, "El servicio"),
      fecha: errorFecha,
      hora: errorHora,
    };
    setErrores(nuevos);

    const hayErrores = Object.values(nuevos).some((mensaje) => mensaje !== "");
    if (!hayErrores && props.onSolicitar) {
      props.onSolicitar({
        mascota: datos.mascota.trim(),
        especie: datos.especie,
        servicio: servicios.find((s) => s.codigo === datos.servicio),
        fecha: datos.fecha,
        hora: datos.hora,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4 tarjeta-login" noValidate>
      <CampoFormulario
        id="mascota"
        name="mascota"
        etiqueta="Nombre de la mascota"
        placeholder="Ej: Rocky"
        valor={datos.mascota}
        onChange={manejarCambio}
        error={errores.mascota}
      />
      <CampoFormulario
        id="especie"
        name="especie"
        etiqueta="Especie"
        opciones={ESPECIES}
        valor={datos.especie}
        onChange={manejarCambio}
        error={errores.especie}
      />
      <CampoFormulario
        id="servicio"
        name="servicio"
        etiqueta="Servicio"
        opciones={opcionesServicio}
        placeholder="Selecciona un servicio"
        valor={datos.servicio}
        onChange={manejarCambio}
        error={errores.servicio}
      />

      <SelectorFechaHora
        fecha={datos.fecha}
        hora={datos.hora}
        onChangeFecha={manejarCambio}
        onChangeHora={manejarCambio}
        ocupadas={props.ocupadas}
        errorFecha={errores.fecha}
        errorHora={errores.hora}
      />

      <Boton tipo="submit" texto="Solicitar cita" variante="primary" className="w-100 btn-lg" />
    </form>
  );
}

export default FormularioSolicitudCita;