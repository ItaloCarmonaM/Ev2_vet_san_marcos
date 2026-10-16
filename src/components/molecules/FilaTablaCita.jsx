import EtiquetaEspecie from "../atoms/EtiquetaEspecie";
import EtiquetaEstadoCita from "../atoms/EtiquetaEstadoCita";
import Boton from "../atoms/Boton";
import { separarEspecies, formatearFecha } from "../../utils/formato";

// Acciones disponibles según el estado actual de la cita
const CANCELAR = { texto: "Cancelar", estado: "Cancelada", variante: "outline-danger" };
const ACCIONES = {
  Pendiente: [{ texto: "Confirmar", estado: "Confirmada", variante: "primary" }, CANCELAR],
  Confirmada: [{ texto: "Completar", estado: "Completada", variante: "primary" }, CANCELAR],
};

function FilaTablaCita({ cita, onCambiarEstado }) {
  const nombreServicio =
    typeof cita.servicio === "object" ? cita.servicio.nombre : cita.servicio;
  const acciones = ACCIONES[cita.estado] || [];

  return (
    <tr>
      <td>{formatearFecha(cita.fecha)}</td>
      <td>{cita.hora}</td>
      <td>
        {cita.mascota}{" "}
        {separarEspecies(cita.especie).map((e) => (
          <EtiquetaEspecie key={e} especie={e} />
        ))}
      </td>
      <td>{nombreServicio}</td>
      <td>
        <EtiquetaEstadoCita estado={cita.estado} />
      </td>
      {onCambiarEstado && (
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
                  onClick={() => onCambiarEstado(cita.id, a.estado)}
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