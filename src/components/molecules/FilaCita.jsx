import EtiquetaEspecie from "../atoms/EtiquetaEspecie";
import EtiquetaEstadoCita from "../atoms/EtiquetaEstadoCita";
import Boton from "../atoms/Boton";
import { separarEspecies, formatearFecha, nombreDeServicio } from "../../utils/formato";

function FilaCita(props) {
  const nombreServicio = nombreDeServicio(props.cita);

  return (
    <div className="card flex-row align-items-center justify-content-between p-3 mb-2">
      <div className="d-flex align-items-center gap-3 flex-wrap">
        <div>
          <h6 className="mb-0 fw-bold">{nombreServicio}</h6>
          <small className="text-muted">
            Mascota: {props.cita.mascota} • {formatearFecha(props.cita.fecha)} {props.cita.hora}
          </small>
        </div>
        <div>
          {separarEspecies(props.cita.especie).map((e) => (
            <EtiquetaEspecie key={e} especie={e} />
          ))}
        </div>
        <EtiquetaEstadoCita estado={props.cita.estado} />
      </div>

      {props.onAccion && (
        <Boton
          texto="Ver Detalle"
          onClick={() => props.onAccion(props.cita)}
          variante="outline-primary"
        />
      )}
    </div>
  );
}

export default FilaCita;