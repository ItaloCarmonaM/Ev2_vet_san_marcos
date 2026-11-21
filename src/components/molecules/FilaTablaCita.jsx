import EtiquetaEspecie from "../atoms/EtiquetaEspecie";
import EtiquetaEstadoCita from "../atoms/EtiquetaEstadoCita";
import Boton from "../atoms/Boton";
import {
  separarEspecies,
  formatearFecha,
  nombreDeServicio,
  nombreDeMascota,
  especieDeCita,
} from "../../utils/formato";

const CANCELAR = { texto: "Cancelar", estado: "Cancelada", variante: "outline-danger" };
const ACCIONES = {
  pendiente: [{ texto: "Confirmar", estado: "Confirmada", variante: "primary" }, CANCELAR],
  confirmada: [{ texto: "Completar", estado: "Completada", variante: "primary" }, CANCELAR],
};

function FilaTablaCita(props) {
  const nombreServicio = nombreDeServicio(props.cita);
  const estadoNorm = String(props.cita.estado || "").toLowerCase();
  const acciones = ACCIONES[estadoNorm] || [];
  const mascota = nombreDeMascota(props.cita);
  const especie = especieDeCita(props.cita);

  return (
    <tr>
      <td>{formatearFecha(props.cita.fecha)}</td>
      <td>{String(props.cita.hora || "").slice(0, 5)}</td>
      <td>
        {mascota}{" "}
        {separarEspecies(especie).map((e) => (
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
