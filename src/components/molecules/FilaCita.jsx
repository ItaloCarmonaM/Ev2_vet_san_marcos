import EtiquetaEspecie from "../atoms/EtiquetaEspecie";
import EtiquetaEstadoCita from "../atoms/EtiquetaEstadoCita";
import Boton from "../atoms/Boton";
import { separarEspecies, formatearFecha } from "../../utils/formato";

function FilaCita({ cita, onAccion }) {
  const { mascota, especie, fecha, hora, estado } = cita;
  const nombreServicio =
    typeof cita.servicio === "object" ? cita.servicio.nombre : cita.servicio;

  return (
    <div className="card flex-row align-items-center justify-content-between p-3 mb-2">
      <div className="d-flex align-items-center gap-3 flex-wrap">
        <div>
          <h6 className="mb-0 fw-bold">{nombreServicio}</h6>
          <small className="text-muted">
            Mascota: {mascota} • {formatearFecha(fecha)} {hora}
          </small>
        </div>
        <div>
          {separarEspecies(especie).map((e) => (
            <EtiquetaEspecie key={e} especie={e} />
          ))}
        </div>
        <EtiquetaEstadoCita estado={estado} />
      </div>

      {onAccion && (
        <Boton
          texto="Ver Detalle"
          onClick={() => onAccion(cita)}
          variante="outline-primary"
        />
      )}
    </div>
  );
}

export default FilaCita;