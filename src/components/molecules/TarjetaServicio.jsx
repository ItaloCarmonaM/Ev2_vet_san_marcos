import Icono from "../atoms/Icono";
import EtiquetaEspecie from "../atoms/EtiquetaEspecie";
import Boton from "../atoms/Boton";

function TarjetaServicio(props) {
  // "Perro / Gato" -> ["Perro", "Gato"], una etiqueta por especie
  const especies = props.especie
    ? props.especie.split("/").map((e) => e.trim())
    : [];

  // 15000 -> "15.000"
  const precio =
    props.precio !== undefined ? Number(props.precio).toLocaleString("es-CL") : "";

  return (
    <div className="card h-100 shadow-sm tarjeta-servicio">
      <div className="card-body d-flex flex-column">
        <div className="mb-2">
          {especies.map((e) => (
            <EtiquetaEspecie key={e} especie={e} />
          ))}
        </div>

        <h5 className="card-title fw-bold">{props.nombre}</h5>

        <p className="text-muted small mb-3 d-flex align-items-center gap-1">
          <Icono nombre="reloj" tamano={16} />
          {props.duracion}
        </p>

        <p className="fs-5 fw-bold mt-auto mb-3">${precio}</p>

        {props.onSolicitar && (
          <Boton
            texto="Solicitar cita"
            variante="primary"
            className="w-100"
            onClick={() => props.onSolicitar(props.codigo)}
          />
        )}
      </div>
    </div>
  );
}

export default TarjetaServicio;