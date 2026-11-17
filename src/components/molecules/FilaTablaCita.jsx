import EtiquetaEspecie from "../atoms/EtiquetaEspecie";
import EtiquetaEstadoCita from "../atoms/EtiquetaEstadoCita";
import Boton from "../atoms/Boton";
import { separarEspecies, formatearFecha, nombreDeServicio } from "../../utils/formato";

// Acciones disponibles según el estado actual de la cita
const CANCELAR = { texto: "Cancelar", estado: "Cancelada", variante: "outline-danger" };
const ACCIONES = {
  Pendiente: [{ texto: "Confirmar", estado: "Confirmada", variante: "primary" }, CANCELAR],
  Confirmada: [{ texto: "Completar", estado: "Completada", variante: "primary" }, CANCELAR],
};

function FilaTablaCita(props) {
  const nombreServicio = nombreDeServicio(props.cita);
  const acciones = ACCIONES[props.cita.estado] || [];

  return (
    <tr>
      <td>{formatearFecha(props.cita.fecha)}</td>
      <td>{props.cita.hora}</td>
      <td>
        {props.cita.mascota}{" "}
        {separarEspecies(props.cita.especie).map((e) => (
          <EtiquetaEspecie key={e} especie={e} />
        ))}
      </td>
      <td>{nombreServicio}</td>
      <td>
        <EtiquetaEstadoCita estado={props.cita.estado} />
      </td>
      {props.onCambiarEstado && (
        <td>
          {acciones.length === 0 ? (
            <span className="text-muted">—</span>
          ) : (
            <div className="d-flex gap-2">
              {acciones.map((a) => (
                <Boton
                  key={a.estado}
                  texto={a.texto}
                  variante={a.variante}
                  className="btn-sm"
                  onClick={() => props.onCambiarEstado(props.cita.id, a.estado)}
                />
              ))}
            </div>
          )}
        </td>
      )}
    </tr>
  );
}

export default FilaTablaCita;