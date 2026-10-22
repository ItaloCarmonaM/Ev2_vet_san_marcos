import EtiquetaEstadoVacuna from "../atoms/EtiquetaEstadoVacuna";
import { formatearFecha } from "../../utils/formato";
import { estadoVacuna } from "../../utils/vacunas";

function FilaVacuna({ vacuna }) {
  return (
    <tr>
      <td className="fw-semibold">{vacuna.nombre}</td>
      <td>{formatearFecha(vacuna.aplicada)}</td>
      <td>{formatearFecha(vacuna.proxima)}</td>
      <td>
        <EtiquetaEstadoVacuna estado={estadoVacuna(vacuna.proxima)} />
      </td>
    </tr>
  );
}

export default FilaVacuna;